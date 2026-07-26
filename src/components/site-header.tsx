"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/integrations", label: "Integrations" },
  { href: "/migrating/my-fbo", label: "Switching" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button href={LOGIN_URL} variant="ghost">
            Sign in
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
          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
            <Button href={LOGIN_URL} variant="secondary" className="w-full">
              Sign in
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
