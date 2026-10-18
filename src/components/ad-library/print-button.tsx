"use client";

import { Printer } from "lucide-react";

/** Prints the page as a checklist; the site's header and footer are left off the paper. */
export function PrintButton({ label = "Print checklist" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-medium text-brand-surface hover:border-primary hover:text-primary print:hidden"
    >
      <Printer className="size-4" aria-hidden />
      {label}
    </button>
  );
}
