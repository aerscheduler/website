"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

const KEY = "aer-migrate-banner-dismissed";

export function MigrationBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <div className="relative z-50 border-b border-primary/15 bg-[#eef4fc] text-[13px] text-brand-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2.5 pr-10 text-center sm:px-6">
        <p>
          Coming from another platform?{" "}
          <Link
            href="/migrating/my-fbo"
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            See how schools are moving to AerScheduler
          </Link>
          <span className="text-muted-foreground"> — including MyFBO.</span>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-white/70 hover:text-foreground"
          aria-label="Dismiss banner"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
