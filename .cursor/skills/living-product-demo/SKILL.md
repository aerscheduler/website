---
name: living-product-demo
description: >-
  Build Notion-style living product demos on the AerScheduler marketing site
  (animated cursor, drag/resize, create, context-menu cancel, seamless loops).
  Use when adding or polishing a feature mock demo, homepage hero animation,
  FeatureVisual living preview, or when the user asks for a product walkthrough
  animation on / or /features/*.
---

# Living product demos

Notion-style “someone is using the product” loops for marketing mocks. Homepage
hero reference: `src/components/mocks/schedule-hero-demo.tsx`. Static mocks stay
in `src/components/mocks/*-mock.tsx` and are the reduced-motion fallback.

## When to use

- Homepage hero or a feature page visual should *show* the product working
- User asks to animate a mock, add a cursor walkthrough, or “make it live”
- Extending demos to another feature after scheduling

## Non-goals

- Do not animate every section on a page — one living visual per hero/feature
- Do not invent UI the real product doesn’t have (no dashed “upcoming” outlines,
  no fake selection rings that aren’t in-app)
- Do not hard-reset the board mid-loop if the reverse sequence can restore seed

## Architecture checklist

Copy this and track it per demo:

```
Demo progress:
- [ ] Static mock exists (or reuse shell + real-looking chips)
- [ ] `data-demo="…"` hooks on every click/drag target
- [ ] Stage wrapper + `stageRef` for % aiming
- [ ] `useInView` gate + `prefers-reduced-motion` → static mock
- [ ] Cursor tip = (left%, top%) of cursor node; SVG translated so tip sits there
- [ ] `origin-top-left` on press scale (or tip jumps)
- [ ] Free moves: curved bezier; tracking moves: straight + CSS-matched ease
- [ ] Drag/resize: project destination from board geometry, tip leads chip by ~1 frame
- [ ] Loop reverses mutations (no visible hard reset); cursor never hides mid-loop
- [ ] Calibrate with tip vs target screenshots before calling it done
```

## File layout

| Piece | Where |
|-------|--------|
| Living demo | `src/components/mocks/<feature>-hero-demo.tsx` (or `*-live-demo.tsx`) |
| Static fallback | existing `*-mock.tsx` |
| Wire-up | homepage section and/or `FeatureVisual` in `feature-page.tsx` |
| Shared shell | `AppMockShell`, `MockHeader`, `MockFloat` in `shell.tsx` |

Prefer one self-contained demo file per feature. Shared aiming/easing lives in
`src/components/mocks/living/demo-runtime.tsx` — use `LivingBoard` + `DemoController`
for new list/form demos; keep board geometry demos (scheduling) specialized.

## Interaction vocabulary

Use a short loop (4–8 beats) that sells the feature:

| Beat | How |
|------|-----|
| Select / open | Aim + press |
| Move on a board | Press → update model → tip **tracks** chip |
| Resize edge | Aim `right-edge` → press → project new edge → track |
| Create | Click primary CTA → pop-in chip (`animate-demo-pop`) |
| Delete / cancel | Right-click → context menu → **Cancel booking** (or feature-equivalent) |
| Reverse | Undo moves/resizes; cancel what you created; soft-restore what you cancelled |

## Cursor rules (non-negotiable)

1. **Tip is the aim point** — position the wrapper at the target; SVG uses
   negative translate so the arrow point sits on `(left, top)`.
2. **`origin-top-left` when scaling for press** — default origin moves the tip
   up/left off the target.
3. **Measure live DOM** for free moves (`getBoundingClientRect` → % of stage).
4. **Project geometry for drag/resize destinations** — measuring after
   `setState` often returns the *old* box (CSS transition hasn’t moved yet), so
   `go()` appears to “drag” without the cursor moving.
5. **Tracking moves**: `bow = 0`, duration = chip CSS duration (700ms), ease =
   same cubic-bezier as the chip, start tip ~1 frame before updating the model.
6. **Keep pressing true** during drag/resize (`keepPressing` / don’t clear in
   `moveCursor`).
7. **Cursor never disappears** between loop cycles — park at a rest point still
   visible. Hide only when the demo scrolls out of view / reduced motion.

## Seamless loops

Forward actions must have reverse actions so the board returns to seed without
`setBlocks(SEED)` flashing:

1. Move A → later move A home
2. Stretch B → shrink B home
3. Create C → context-menu cancel C
4. Cancel D → soft re-enter D while cursor parks

Only seed once when the effect starts (or when `inView` flips on).

## Visual fidelity

- Match real chip styling (solid fills, no marketing-only dashed borders)
- Selection = brightness/shadow, not white rings unless the app does that
- Context menu should look like a small OS/app menu, not a marketing card
- One named operator on the cursor badge (e.g. `Maya · Desk`)

## Calibration

Before shipping:

1. Run local site; screenshot tip (red) vs target center (other color) at press
2. Book / primary CTA: dx≈0, \|dy\| ≤ ~4px
3. Drag: tip stays on chip center for the whole transition
4. Resize: tip stays on the moving right edge
5. Loop: no fade-out, no hard board flash

## Feature backlog (website)

| Slug | Static mock | Living demo |
|------|-------------|-------------|
| scheduling | `schedule-mock` | `schedule-hero-demo` / `SchedulingLiveDemo` |
| self-booking | `self-booking-mock` | `SelfBookingLiveDemo` |
| fleet | `fleet-mock` | `FleetLiveDemo` |
| people-roles | `people-mock` | `PeopleLiveDemo` |
| compliance | `compliance-mock` | `ComplianceLiveDemo` |
| instruction | `instruction-mock` | `InstructionLiveDemo` |
| training | `training-mock` | `TrainingLiveDemo` |
| billing | `billing-mock` | `BillingLiveDemo` |
| memberships | `memberships-mock` | `MembershipsLiveDemo` |
| maintenance | `maintenance-mock` | `MaintenanceLiveDemo` |
| reports | `reports-mock` | `ReportsLiveDemo` |
| integrations | `integrations-mock` | `IntegrationsLiveDemo` |
| mobile | `PhoneMock` | `MobileLiveDemo` |

Shared runtime: `src/components/mocks/living/demo-runtime.tsx` (`LivingBoard`, `useDemoPlayer`).
Wire-up: `FeatureVisual` in `feature-page.tsx` mounts the live demos.
Homepage hero still uses `ScheduleHeroDemo` directly.

## Additional resources

- Hard-won edge cases and failed approaches: [edge-cases.md](edge-cases.md)
- Reference implementation: `src/components/mocks/schedule-hero-demo.tsx`
- Pop animation: `.animate-demo-pop` in `src/app/globals.css`
