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
import { Button } from "@/components/button";
import { FEATURE_GROUPS, FEATURES, featureHref } from "@/lib/features";
import { INTEGRATION_LINKS } from "@/lib/integrations";
import { RESOURCE_GROUPS } from "@/lib/resources";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

type MegaId = "features" | "integrations" | "resources";

const MEGA_TRIGGERS: { id: MegaId; label: string }[] = [
  { id: "features", label: "Features" },
  { id: "integrations", label: "Integrations" },
  { id: "resources", label: "Resources" },
];

const RIGHT_NAV = [
  { href: "/pricing", label: "Pricing" },
  { href: "/app", label: "App" },
];

/** Features mega-menu omits Integrations — that has its own trigger. */
const NAV_FEATURE_GROUPS = FEATURE_GROUPS.map((group) => ({
  ...group,
  items: group.items.filter((slug) => slug !== "integrations"),
})).filter((group) => group.items.length > 0);

const PANEL_WIDTH: Record<MegaId, number> = {
  features: 720,
  integrations: 380,
  // Matches `features` so the third group (Reporting) sits beside the other two
  // instead of wrapping onto a second row — the panel grows sideways, which
  // there is room for, rather than downwards, which there isn't.
  resources: 720,
};

export function SiteHeader() {
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
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Logo />

        <nav
          className="hidden min-w-0 flex-1 items-center md:flex"
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
                    <div className="grid grid-cols-2 gap-0 p-3 lg:grid-cols-4">
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
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-border bg-[#fafbfc] px-5 py-3">
                      <p className="text-xs text-muted-foreground">
                        Scheduling, billing, MX &amp; mobile in one place
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
                        On every plan — no premium tier
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
                    {/* One column per group. The panel is a fixed width, so
                        these are not viewport-responsive — three groups, three
                        columns. */}
                    <div className="grid grid-cols-3 gap-0 p-3">
                      {RESOURCE_GROUPS.map((group) => (
                        <div key={group.title} className="px-3 py-3">
                          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {group.title}
                          </p>
                          <ul className="mt-2 space-y-0.5">
                            {group.items.map((item) => (
                              <li key={item.href}>
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
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-border bg-[#fafbfc] px-5 py-3">
                      <p className="text-xs text-muted-foreground">
                        Guides for switching platforms and choosing software
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
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button href="/login" variant="ghost">
            Login
          </Button>
          <Button href={SIGNUP_URL} variant="primary">
            Get started
            <ChevronRight className="size-4 opacity-80" />
          </Button>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border bg-white md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
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
            {RESOURCE_GROUPS.map((group) => (
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
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
            <Button href="/login" variant="secondary" className="w-full">
              Login
            </Button>
            <Button href={SIGNUP_URL} variant="primary" className="w-full">
              Get started
              <ChevronRight className="size-4 opacity-80" />
            </Button>
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
