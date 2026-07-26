import Link from "next/link";
import { Logo } from "@/components/logo";
import { SUPPORT_EMAIL } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/product", label: "Overview" },
      { href: "/pricing", label: "Pricing" },
      { href: "/integrations", label: "Integrations" },
      { href: "/product", label: "Mobile apps" },
    ],
  },
  {
    title: "Switching",
    links: [
      { href: "/migrating/my-fbo", label: "From MyFBO" },
      { href: "/migrating/my-fbo#playbook", label: "Migration playbook" },
      { href: "/migrating/my-fbo#faq", label: "FAQs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: `mailto:${SUPPORT_EMAIL}`, label: "Support" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#fafbfc]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Schedule aircraft, manage your team, and keep billing square — on the
            web and in native iOS & Android apps.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} AerScheduler. All rights reserved.</p>
          <p>Self-serve. No sales call required.</p>
        </div>
      </div>
    </footer>
  );
}
