# Living demo edge cases

Lessons from building `schedule-hero-demo.tsx`. Read this when a demo “almost
works” but feels off — most bugs below look like taste issues and are actually
geometry/timing bugs.

## Aiming & click offset

### Symptom: tip clicks slightly above the button / chip

**Causes that fooled us:**

1. **Press `scale-90` with default transform-origin** — scales toward the center
   of the cursor *including the name badge*, so the tip slides up/left at the
   moment of click. Fix: `origin-top-left` on the cursor wrapper.
2. **Hardcoded % waypoints** — break when the shell width/layout changes
   (hero went from ~400px → ~720px). Fix: measure `getBoundingClientRect`
   against a `stageRef` every beat.
3. **Y “nudge” guesswork** — a fixed `+6px` overcorrected after fixing origin.
   Prefer zero pad once tip/origin are correct; calibrate with screenshots.

### Calibration method

Inject temporary dots (tip = red, target center = purple/green), screenshot at
`pressing === true`. Adjust until dx≈0 and \|dy\| small. Remove dots before ship.

### Book / header buttons

Header actions may not have `data-demo` — find by text inside the stage:

```ts
[...stage.querySelectorAll("button")].find((b) => /Book/.test(b.textContent ?? ""))
```

## Drag with no cursor motion

### Symptom: chip slides but the mouse barely moves (or stays put)

**Root cause:** After `setBlocks({ start, end })`, `querySelector` +
`getBoundingClientRect` still reports the **pre-transition** box (or the final
box if you measure too late). Aiming at “current right edge” after the update
targets where the cursor already is.

**Fix:** Project the destination from board math (row width × hour fraction),
convert to stage %, then animate the tip there while the CSS width/left runs:

```ts
pointForBlockAt(id, start, end, "right-edge" | "center")
```

Kick `moveCursor(dest, 700, { tracking: true })` **one frame before**
`setBlocks` so the tip leads the chip.

## Tip lags behind the chip mid-drag

### Causes

1. **Bezier bow during track** — free-move arcs look natural; during drag the
   chip moves in a straight line, so a bowed tip falls behind on the travel axis.
   Fix: `bow = 0` when `tracking`.
2. **Ease mismatch** — chip uses `cubic-bezier(0.33, 1, 0.68, 1)` (fast start);
   cursor used ease-in-out (slow start). Chip races ahead on frame 1–10.
   Fix: same duration (700ms) + same easing function for tracking moves.
3. **Starting cursor after `setBlocks`** — React commit + paint let CSS start
   first. Fix: start tip animation, `await wait(16)`, then update model.
4. **`moveCursor` clearing `pressing`** — looks like a release mid-drag.
   Fix: `keepPressing: true` on tracking moves.

## Loop seams

### Symptom: board “pops” back to the start; cursor vanishes and reappears

1. **Hard `setBlocks(SEED)` every cycle** — visible flash. Fix: reverse each
   mutation with the cursor; seed only on effect start / `inView` enter.
2. **`visible: false` at end of loop** — Notion demos keep the hand on stage.
   Park at REST still visible; only hide when out of view or reduced motion.
3. **Deleting without restore** — cancelled rows must soft re-enter (or be
   recreated) in the reverse phase or the next cycle can’t aim at them.

## Cancel / delete clarity

### Symptom: chip just fades; unclear what the user did

Don’t delete on hover or a plain left-click vanish. Use a **right-click beat**:
brief press → context menu near tip → move to **Cancel booking** (or Delete) →
press → exit animation → remove from state.

Menu must be inside the stage so aiming can measure `[data-demo="ctx-cancel"]`.
Wait ~1 paint after `setMenu` before measuring the item.

## Visual language traps

- **Dashed outlines** on upcoming chips read as “prototype,” not product. Match
  the static mock / real app.
- **White selection rings** same problem — prefer brightness + shadow.
- **Marketing chrome on chips** (floating badges, stickers) fights the “real UI”
  illusion the cursor is selling.

## Reduced motion & performance

- `prefers-reduced-motion: reduce` → render the static mock only.
- Gate the loop on `useInView` so offscreen heroes don’t run timers/rAF.
- Cancel timers + rAF on cleanup / `inView` false; reset state when leaving view.

## What not to do next time

| Tempting shortcut | Why it fails |
|-------------------|--------------|
| Hardcoded cursor % paths | Layout/width changes desync every click |
| Measure DOM after resize `setState` for the drag target | Cursor doesn’t travel |
| Shared ease-in-out for free move and drag | Drag tip lags |
| Hide cursor between loops for a “clean” restart | Looks broken, not polished |
| Fake dashed/selected chrome | Breaks product fidelity |
| One giant shared abstraction on day one | Aiming/easing edge cases are easier to fix in one reference file first |

## Reference constants (scheduling demo)

- Board hours: `BOARD_START` / `BOARD_END` from `lib/time-of-day`
- Chip transition: `duration-700` + `ease-[cubic-bezier(0.33,1,0.68,1)]`
- Cursor tip SVG adjust: `-translate-x-[5.5px] -translate-y-[3.5px]` on 26×26 /
  viewBox 0 0 24 24 path starting at `(5.5, 3.5)`
