/**
 * Colour tokens for the home page product composites (light theme; the page
 * was dark for a day, then went light to match the rest of the site). Kept in a plain module, not in
 * the "use client" `dark-ui.tsx`: a server component importing a constant from a
 * client module receives a client reference instead of the value, and every
 * colour silently rendered as white.
 */

export const INK = {
  panel: "bg-white",
  raised: "bg-[#fafafa]",
  line: "border-black/[0.08]",
  text: "text-[#1b1c1f]",
  dim: "text-black/45",
  faint: "text-black/30",
};

export const STATUS = {
  green: "#2f9e6b",
  yellow: "#d19a12",
  red: "#d64545",
  blue: "#3b6fe0",
  purple: "#7c62e8",
  orange: "#e07b28",
  grey: "#8a8f98",
} as const;
