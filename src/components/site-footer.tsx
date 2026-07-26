import Link from "next/link";
import { Logo } from "@/components/logo";
import { FEATURE_GROUPS, FEATURES } from "@/lib/features";
import { SUPPORT_EMAIL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#fafbfc]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Schedule aircraft, manage your team, and keep billing square — on the
            web and in native iOS & Android apps.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {FEATURE_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/features/${slug}`}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {FEATURES[slug].navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} AerScheduler. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="/migrating/my-fbo" className="hover:text-foreground">
              Switching
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-foreground">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
