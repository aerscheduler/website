"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import { FEATURE_GROUPS, FEATURES, featureHref } from "@/lib/features";
import { RESOURCE_GROUPS } from "@/lib/resources";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/pricing", label: "Pricing" },
  { href: "/app", label: "App" },
  { href: "/integrations", label: "Integrations" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (!featuresRef.current?.contains(target)) setFeaturesOpen(false);
      if (!resourcesRef.current?.contains(target)) setResourcesOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setFeaturesOpen(false);
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <div
            ref={featuresRef}
            className="relative"
            onMouseEnter={() => {
              setFeaturesOpen(true);
              setResourcesOpen(false);
            }}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                featuresOpen
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-expanded={featuresOpen}
              aria-haspopup="true"
              onClick={() => {
                setFeaturesOpen((v) => !v);
                setResourcesOpen(false);
              }}
            >
              Features
              <ChevronDown
                className={cn(
                  "size-3.5 opacity-70 transition-transform",
                  featuresOpen && "rotate-180"
                )}
              />
            </button>

            {featuresOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[min(92vw,720px)] -translate-x-[28%] pt-3">
                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
                  <div className="grid grid-cols-2 gap-0 p-3 lg:grid-cols-4">
                    {FEATURE_GROUPS.map((group) => (
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
                                  onClick={() => setFeaturesOpen(false)}
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
                      Stripe, Google Calendar &amp; QuickBooks available
                    </p>
                    <Link
                      href="/features"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      onClick={() => setFeaturesOpen(false)}
                    >
                      All features
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => {
              setResourcesOpen(true);
              setFeaturesOpen(false);
            }}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                resourcesOpen
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              onClick={() => {
                setResourcesOpen((v) => !v);
                setFeaturesOpen(false);
              }}
            >
              Resources
              <ChevronDown
                className={cn(
                  "size-3.5 opacity-70 transition-transform",
                  resourcesOpen && "rotate-180"
                )}
              />
            </button>

            {resourcesOpen && (
              <div className="absolute right-0 top-full z-50 w-[min(92vw,440px)] pt-3">
                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
                  <div className="grid grid-cols-1 gap-0 p-3 sm:grid-cols-2">
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
                                onClick={() => setResourcesOpen(false)}
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
                      onClick={() => setResourcesOpen(false)}
                    >
                      All resources
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
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
          className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
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
          <button
            type="button"
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            onClick={() => setMobileFeaturesOpen((v) => !v)}
          >
            Features
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                mobileFeaturesOpen && "rotate-180"
              )}
            />
          </button>
          {mobileFeaturesOpen && (
            <div className="mb-2 ml-2 space-y-3 border-l border-border pl-3">
              {FEATURE_GROUPS.map((group) => (
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
            </div>
          )}

          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            onClick={() => setMobileResourcesOpen((v) => !v)}
          >
            Resources
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                mobileResourcesOpen && "rotate-180"
              )}
            />
          </button>
          {mobileResourcesOpen && (
            <div className="mb-2 ml-2 space-y-3 border-l border-border pl-3">
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
            </div>
          )}

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
