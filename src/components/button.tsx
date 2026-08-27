"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { track, trackConversion } from "@/lib/analytics";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "md" | "lg";
  /**
   * Overrides the label reported to analytics. Only needed when the button's visible
   * text isn't descriptive on its own. Normally the text is the label.
   */
  trackAs?: string;
};

/**
 * Every call-to-action on the marketing site.
 *
 * It is a client component purely so the click can be measured. That measurement is the
 * only reliable way to see the top of the funnel: the CTA leaves for
 * `app.aerscheduler.com`, a different origin, so from the marketing site's point of view
 * the visitor simply vanishes. Recording the click before they go is what connects "read
 * the pricing page" to "started a signup".
 *
 * The destination decides which event fires, so a new CTA anywhere on the site is
 * measured correctly without the author having to think about analytics.
 */
export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  trackAs,
  onClick,
  ...props
}: ButtonProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const href = props.href ?? "";
    // The rendered text, which is the label a human would use for this button. Falls
    // back through `trackAs` and aria-label for icon-only buttons.
    const label =
      trackAs ?? event.currentTarget.textContent?.trim().slice(0, 80) ?? props["aria-label"] ?? "";

    const shared = { label, href, from: pathname };

    if (href.includes("/signup")) {
      // The moment we start paying for: someone leaving to create an account. Reported to
      // Google and Meta so their bidding optimises for it, since the actual account
      // creation happens on a domain their tag isn't on.
      trackConversion("signup_started", shared);
    } else if (href.includes("calendar.app.google")) {
      // Leaving for Google's booking page. Checked BEFORE the demo branch because
      // the booking CTA lives on /book-a-demo and would otherwise look like one.
      trackConversion("demo_booked", shared);
    } else if (href.includes("/demo")) {
      trackConversion("demo_opened", shared);
    } else {
      track("cta_click", shared);
    }

    onClick?.(event);
  }

  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-semibold tracking-tight transition-all duration-200",
        "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-[15px]",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-sm hover:bg-[#1557b0] hover:-translate-y-px",
        variant === "secondary" &&
          "border border-border bg-white text-foreground shadow-sm hover:bg-muted hover:-translate-y-px",
        variant === "ghost" && "text-muted-foreground hover:text-foreground",
        variant === "dark" &&
          "bg-brand-surface text-white shadow-sm hover:bg-brand-surface-2 hover:-translate-y-px",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
