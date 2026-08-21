import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { DEVELOPER_LINKS } from "@/lib/developers";
import { FOOTER_RESOURCE_LINKS } from "@/lib/resources";

const PRODUCT = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/integrations", label: "Integrations" },
  { href: "/docs", label: "Docs" },
  { href: "/product", label: "Product overview" },
  { href: "/app", label: "iOS App" },
];

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  // Keeps the demo landing page linked from somewhere on the site. The header
  // used to be its only internal link and now goes straight to the demo itself,
  // which would otherwise leave a page sitting at 0.95 in the sitemap with
  // nothing pointing at it: the state search engines read as "abandoned".
  { href: "/demo", label: "Demo" },
  { href: "/login", label: "Login" },
];

/**
 * One compact band: logo plus four short columns. The old layout dumped every
 * feature group and every resource group into the footer, which wrapped Company
 * under Schedule and left a second Resources grid full of empty space.
 *
 * Feature detail pages stay reachable from `/features` and the header mega-menu;
 * the long resource catalog stays on `/resources`.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#fafbfc]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Schedule aircraft, manage your team, and keep billing square on the
              web and in a native iOS app.
            </p>
          </div>
          <FooterColumn title="Product">
            {PRODUCT.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Company">
            {COMPANY.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Resources">
            {FOOTER_RESOURCE_LINKS.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Developers">
            {DEVELOPER_LINKS.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} AerScheduler. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/delete-account" className="hover:text-foreground">
              Delete account
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
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
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
