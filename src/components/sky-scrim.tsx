/**
 * The dark brand-blue wash over a photographic band, so white text reads on
 * top of the photo. Styles live in `globals.css` (`.band-sky`, `.band-horizon`).
 *
 * It used to follow the visitor's local time of day, cross-fading between six
 * washes in step with an animated hero sky. That was removed on 2026-09-26: the
 * site always shows the day look now, so this is a plain server component.
 */
export function SkyScrim() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="band-sky absolute inset-0" />
      {/* The horizon. Fading the top edge lets the section arrive rather than
          start, and darkening the bottom hands off cleanly to whatever is
          next. */}
      <div className="band-horizon absolute inset-0" />
    </div>
  );
}
