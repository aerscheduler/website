import type { ReactNode } from "react";
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

/**
 * Two bands, because the link inventory is lopsided: four short feature groups
 * and Company run 2–6 items each, while Resources carries fourteen. Stacking
 * Resources under Company inside a five-column grid stretched that one cell to
 * twenty rows and left the rest of the footer as empty space.
 *
 * Resources keeps its own `RESOURCE_GROUPS` headings in a band underneath, so
 * every link still ships (they are the site's internal linking) without one
 * column dragging the footer three screens tall.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#fafbfc]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.4fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Schedule aircraft, manage your team, and keep billing square on the
              web and in a native iOS app.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {FEATURE_GROUPS.map((group) => (
              <FooterColumn key={group.title} title={group.title}>
                {group.items.map((slug) => (
                  <FooterLink key={slug} href={featureHref(slug)}>
                    {FEATURES[slug].navLabel}
                  </FooterLink>
                ))}
              </FooterColumn>
            ))}
            <FooterColumn title="Company">
              {COMPANY.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-10">
          <Link
            href="/resources"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
          >
            Resources
          </Link>
          <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {RESOURCE_GROUPS.map((group) => (
              <FooterColumn key={group.title} title={group.title} muted>
                {group.items.map((item) => (
                  <FooterLink key={item.href} href={item.href}>
                    {item.label}
                  </FooterLink>
                ))}
              </FooterColumn>
            ))}
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

function FooterColumn({
  title,
  muted,
  children,
}: {
  title: string;
  /** Sub-heading weight, for groups nested under the Resources band. */
  muted?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <h3
        className={
          muted
            ? "text-xs font-medium text-foreground/70"
            : "text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
        }
      >
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-foreground/80 transition-colors hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
}
