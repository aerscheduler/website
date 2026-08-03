import Link from "next/link";
import { Logo } from "@/components/logo";
import { FEATURE_GROUPS, FEATURES, featureHref } from "@/lib/features";
import { RESOURCE_GROUPS } from "@/lib/resources";

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/product", label: "Product" },
  { href: "/app", label: "iOS App" },
  //Keeps the demo landing page linked from somewhere on the site. The header
  //used to be its only internal link and now goes straight to the demo itself,
  //which would otherwise leave a page sitting at 0.95 in the sitemap with
  //nothing pointing at it — the state search engines read as "abandoned".
  { href: "/demo", label: "Demo" },
  { href: "/login", label: "Login" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#fafbfc]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2.4fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Schedule aircraft, manage your team, and keep billing square on the
            web and in a native iOS app.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {FEATURE_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={featureHref(slug)}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {FEATURES[slug].navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  All resources
                </Link>
              </li>
              {RESOURCE_GROUPS.flatMap((group) => group.items).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} AerScheduler. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="/integrations" className="hover:text-foreground">
              Integrations
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
