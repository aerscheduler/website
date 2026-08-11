"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { Logo } from "@/components/logo";
import { SiteSearch } from "@/components/site-search";
import { Button } from "@/components/button";
import { FEATURE_GROUPS, FEATURES, featureHref } from "@/lib/features";
import { INTEGRATION_LINKS } from "@/lib/integrations";
import { NAV_RESOURCE_GROUPS } from "@/lib/resources";
import { DEVELOPER_LINKS } from "@/lib/developers";
import { APP_URL, DEMO_URL } from "@/lib/site";
import { useAppAuthStatus } from "@/lib/use-app-auth-status";
import { cn } from "@/lib/cn";

type MegaId = "features" | "integrations" | "resources";

const MEGA_TRIGGERS: { id: MegaId; label: string }[] = [
  { id: "features", label: "Features" },
  { id: "integrations", label: "Integrations" },
  { id: "resources", label: "Resources" },
];

const RIGHT_NAV = [
  { href: "/pricing", label: "Pricing" },
  // Docs sits in the top nav as well as inside the Resources menu. A customer
  // hunting for help does not open a menu called "Resources"; they look for
  // the word "Docs" and give up if it is not there, which is exactly the moment
  // they email support instead.
  { href: "/docs", label: "Docs" },
];

/**
 * Desktop nav shows from this breakpoint up. Below it, the hamburger.
 *
 * Was `md` (768px). Features + Integrations + Resources + Pricing + Live demo +
 * Docs already fill a mid-width bar, and Login / Get started / App used to shove
 * them into each other. With those gone the links still need room for the mega
 * triggers' labels. `lg` (1024px) is where they stop colliding.
 */
const NAV_DESKTOP = "lg:flex";
const NAV_MOBILE_ONLY = "lg:hidden";

/**
 * A right-nav entry, as a router link or a plain anchor depending on where it goes.
 *
 * `next/link` does render an absolute URL as an ordinary anchor, but leaning on
 * that leaves the reader to work out which of these leave the marketing site.
 * Being explicit costs four lines.
 */
function RightNavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (/^https?:\/\//.test(href)) {
    //Same tab on purpose: the demo IS the product, so this is going deeper in,
    //not off to somebody else's site.
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/** Features mega-menu omits Integrations; that has its own trigger. */
const NAV_FEATURE_GROUPS = FEATURE_GROUPS.map((group) => ({
  ...group,
  items: group.items.filter((slug) => slug !== "integrations"),
})).filter((group) => group.items.length > 0);

const PANEL_WIDTH: Record<MegaId, number> = {
  // Five columns since Developers joined: the panel grows sideways rather than
  // wrapping a fifth group onto a lonely second row.
  features: 880,
  integrations: 380,
  // Four curated columns (see NAV_RESOURCE_GROUPS). Same ballpark as Features:
  // wide enough for four label columns, short enough that mid-width desktops
  // don't clip the panel off the right edge.
  resources: 880,
};

export function SiteHeader() {
  const signedIn = useAppAuthStatus();
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaId | null>(null);
  const [panelReady, setPanelReady] = useState(false);
  const [panelSize, setPanelSize] = useState({
    width: PANEL_WIDTH.features,
    height: 280,
  });
  const [mobileOpen, setMobileOpen] = useState<MegaId | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<Partial<Record<MegaId, HTMLDivElement | null>>>(
    {}
  );
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMega = useCallback(
    (id: MegaId) => {
      clearCloseTimer();
      setActiveMega(id);
    },
    [clearCloseTimer]
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setActiveMega(null), 120);
  }, [clearCloseTimer]);

  const closeMega = useCallback(() => {
    clearCloseTimer();
    setActiveMega(null);
  }, [clearCloseTimer]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!megaRef.current?.contains(e.target as Node)) closeMega();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMega();
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [closeMega]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  // Lock the page under the mobile menu so a tall Features accordion scrolls
  // inside the panel instead of dragging the document underneath it.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  // Measure active panel content so width/height can morph between menus.
  useLayoutEffect(() => {
    if (!activeMega) {
      setPanelReady(false);
      return;
    }
    const el = contentRefs.current[activeMega];
    if (!el) return;
    const next = {
      width: PANEL_WIDTH[activeMega],
      height: el.offsetHeight,
    };
    setPanelSize(next);
    // Allow one frame so the first open doesn't animate from stale size.
    const id = requestAnimationFrame(() => setPanelReady(true));
    return () => cancelAnimationFrame(id);
  }, [activeMega]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo />

        <nav
          className={cn("hidden min-w-0 flex-1 items-center", NAV_DESKTOP)}
          aria-label="Primary"
        >
          <div
            ref={megaRef}
            className="relative flex items-center gap-1"
            onMouseLeave={scheduleClose}
          >
            {MEGA_TRIGGERS.map((trigger) => (
              <button
                key={trigger.id}
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  activeMega === trigger.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-expanded={activeMega === trigger.id}
                aria-haspopup="true"
                onMouseEnter={() => openMega(trigger.id)}
                onFocus={() => openMega(trigger.id)}
                onClick={() =>
                  activeMega === trigger.id
                    ? closeMega()
                    : openMega(trigger.id)
                }
              >
                {trigger.label}
                <ChevronDown
                  className={cn(
                    "size-3.5 opacity-70 transition-transform",
                    activeMega === trigger.id && "rotate-180"
                  )}
                />
              </button>
            ))}

            <div
              className={cn(
                "absolute left-0 top-full z-50 pt-3 transition-opacity duration-150",
                activeMega
                  ? "pointer-events-auto visible opacity-100"
                  : "pointer-events-none invisible opacity-0"
              )}
              aria-hidden={!activeMega}
              onMouseEnter={clearCloseTimer}
            >
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border border-border bg-white shadow-lg",
                  panelReady &&
                    "transition-[width,height] duration-200 ease-out"
                )}
                style={{
                  width: panelSize.width,
                  height: panelSize.height,
                }}
              >
                <div className="relative">
                  <MegaPanel
                    id="features"
                    active={activeMega}
                    contentRef={(el) => {
                      contentRefs.current.features = el;
                    }}
                  >
                    <div className="grid grid-cols-2 gap-0 p-3 lg:grid-cols-5">
                      {NAV_FEATURE_GROUPS.map((group) => (
                        <div key={group.title} className="px-3 py-3">
                          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {group.title}
                          </p>
                          <ul className="mt-2 space-y-0.5">
                            {group.items.map((slug) => {
                              const f = FEATURES[slug];
                              return (
                                <li key={slug}>
                                  <Link
                                    href={featureHref(slug)}
                                    className="block rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
                                    onClick={closeMega}
                                  >
                                    {f.navLabel}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}

                      {/* Developers gets its own column rather than a line in
                          "Everywhere": the API is a different kind of thing to
                          a feature page, and somebody looking for it is looking
                          for exactly it. */}
                      <div className="px-3 py-3">
                        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Developers
                        </p>
                        <ul className="mt-2 space-y-0.5">
                          {DEVELOPER_LINKS.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
                                onClick={closeMega}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-border bg-[#fafbfc] px-5 py-3">
                      <p className="text-xs text-muted-foreground">
                        Scheduling, billing, MX, mobile &amp; a full REST API
                      </p>
                      <Link
                        href="/features"
                        className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
                        onClick={closeMega}
                      >
                        All features
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </div>
                  </MegaPanel>

                  <MegaPanel
                    id="integrations"
                    active={activeMega}
                    contentRef={(el) => {
                      contentRefs.current.integrations = el;
                    }}
                  >
                    <div className="p-3">
                      <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Available now
                      </p>
                      <ul className="mt-2 space-y-0.5">
                        {INTEGRATION_LINKS.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="block rounded-lg px-2 py-2 hover:bg-muted"
                              onClick={closeMega}
                            >
                              <span className="block text-sm font-medium text-foreground">
                                {item.label}
                              </span>
                              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                {item.description}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-border bg-[#fafbfc] px-5 py-3">
                      <p className="text-xs text-muted-foreground">
                        On every plan, no premium tier
                      </p>
                      <Link
                        href="/integrations"
                        className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
                        onClick={closeMega}
                      >
                        All integrations
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </div>
                  </MegaPanel>

                  <MegaPanel
                    id="resources"
                    active={activeMega}
                    contentRef={(el) => {
                      contentRefs.current.resources = el;
                    }}
                  >
                    {/* Labels only, matching Features: descriptions belonged on
                        the /resources index and were doubling the panel height.
                        Four curated columns from NAV_RESOURCE_GROUPS stay on one
                        row; the rest of the catalog is behind All resources. */}
                    <div className="grid grid-cols-4 gap-0 p-3">
                      {NAV_RESOURCE_GROUPS.map((group) => (
                        <div key={group.title} className="px-3 py-3">
                          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {group.title}
                          </p>
                          <ul className="mt-2 space-y-0.5">
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="block rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
                                  onClick={closeMega}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-border bg-[#fafbfc] px-5 py-3">
                      <p className="text-xs text-muted-foreground">
                        Guides, comparisons, reporting, and full documentation
                      </p>
                      <Link
                        href="/resources"
                        className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
                        onClick={closeMega}
                      >
                        All resources
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </div>
                  </MegaPanel>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1">
            {RIGHT_NAV.map((item) => (
              <RightNavLink
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </RightNavLink>
            ))}
          </div>
        </nav>

        {/*
          Sits outside both the desktop nav and the mobile button so there is
          exactly ONE instance on the page. Two would each register a Cmd-K
          listener and both open. It restyles itself across the breakpoint: a
          bordered square beside the hamburger on mobile, an icon with a label
          and a shortcut hint on desktop.
        */}
        <SiteSearch className="ml-auto lg:ml-0" />

        <div className={cn("hidden items-center gap-2", NAV_DESKTOP)}>
          {signedIn ? (
            <Button href={APP_URL} variant="primary">
              Go to dashboard
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          ) : (
            <Button href={DEMO_URL} variant="primary">
              Live demo
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          )}
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border border-border",
            NAV_MOBILE_ONLY
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border bg-white lg:hidden",
          // Fill the viewport under the h-16 bar and scroll inside. Otherwise
          // a long Features list grows the sticky header past the screen and
          // touch-scroll moves the page underneath the open menu.
          open
            ? "block max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
            : "hidden"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
          <MobileMegaSection
            id="features"
            label="Features"
            open={mobileOpen}
            setOpen={setMobileOpen}
          >
            {NAV_FEATURE_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {group.title}
                </p>
                {group.items.map((slug) => (
                  <Link
                    key={slug}
                    href={featureHref(slug)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    {FEATURES[slug].navLabel}
                  </Link>
                ))}
              </div>
            ))}
            <div>
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Developers
              </p>
              {DEVELOPER_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/features"
              onClick={() => setOpen(false)}
              className="block px-2 py-2 text-sm font-semibold text-primary"
            >
              All features
            </Link>
          </MobileMegaSection>

          <MobileMegaSection
            id="integrations"
            label="Integrations"
            open={mobileOpen}
            setOpen={setMobileOpen}
          >
            {INTEGRATION_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/integrations"
              onClick={() => setOpen(false)}
              className="block px-2 py-2 text-sm font-semibold text-primary"
            >
              All integrations
            </Link>
          </MobileMegaSection>

          <MobileMegaSection
            id="resources"
            label="Resources"
            open={mobileOpen}
            setOpen={setMobileOpen}
          >
            {NAV_RESOURCE_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/resources"
              onClick={() => setOpen(false)}
              className="block px-2 py-2 text-sm font-semibold text-primary"
            >
              All resources
            </Link>
          </MobileMegaSection>

          {RIGHT_NAV.map((item) => (
            <RightNavLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              {item.label}
            </RightNavLink>
          ))}

          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
            {signedIn ? (
              <Button href={APP_URL} variant="primary" className="w-full">
                Go to dashboard
                <ChevronRight className="size-4 opacity-80" />
              </Button>
            ) : (
              <Button href={DEMO_URL} variant="primary" className="w-full">
                Live demo
                <ChevronRight className="size-4 opacity-80" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function MegaPanel({
  id,
  active,
  contentRef,
  children,
}: {
  id: MegaId;
  active: MegaId | null;
  contentRef: (el: HTMLDivElement | null) => void;
  children: ReactNode;
}) {
  const isActive = active === id;
  return (
    <div
      ref={contentRef}
      className={cn(
        "transition-opacity duration-150 ease-out",
        isActive
          ? "relative z-10 opacity-100"
          : "pointer-events-none absolute left-0 top-0 z-0 opacity-0"
      )}
      style={{ width: PANEL_WIDTH[id] }}
      aria-hidden={!isActive}
      // Keep inactive panels mounted for size measurement, but not interactive.
      inert={!isActive ? true : undefined}
    >
      {children}
    </div>
  );
}

function MobileMegaSection({
  id,
  label,
  open,
  setOpen,
  children,
}: {
  id: MegaId;
  label: string;
  open: MegaId | null;
  setOpen: (id: MegaId | null) => void;
  children: ReactNode;
}) {
  const isOpen = open === id;
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
        onClick={() => setOpen(isOpen ? null : id)}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="mb-2 ml-2 space-y-3 border-l border-border pl-3">
          {children}
        </div>
      )}
    </>
  );
}
