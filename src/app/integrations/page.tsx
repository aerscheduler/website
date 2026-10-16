import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, PlayCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { PricingBand } from "@/components/landing/home-blocks";
import { Panel, Tag } from "@/components/landing/product-ui";
import { STATUS } from "@/components/landing/product-tokens";
import { Reveal } from "@/components/reveal";
import { contactHref } from "@/lib/contact";
import { DEMO_URL, signupUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flight School Software Integrations",
  description:
    "AerScheduler integrates with Stripe, Google Calendar, Google Meet, Zoom, Apple Calendar, Outlook, QuickBooks Online, the FAA aircraft registry, and aviation weather. Connect the tools your flight school already uses, on every plan.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Flight School Software Integrations",
    description:
      "Stripe, Google Calendar, Google Meet, Zoom, Apple Calendar, Outlook, QuickBooks Online, the FAA aircraft registry, and aviation weather, available now on every plan.",
    url: "/integrations",
  },
};

type Status = "available" | "coming_soon";

/** Rows are grouped by what the integration is for, in this order. */
const GROUPS = ["Payments and accounting", "Calendars", "Video calls on ground lessons", "Aviation data"] as const;

const INTEGRATIONS: {
  name: string;
  group: (typeof GROUPS)[number];
  status: Status;
  blurb: string;
  detail: string;
  logo: string;
  logoAlt: string;
  learnMoreHref?: string;
  learnMoreLabel?: string;
}[] = [
  {
    name: "Stripe",
    group: "Payments and accounting",
    status: "available",
    blurb: "Cards on file, invoices, ledger top-ups, and online payments.",
    detail:
      "Accept cards for invoices and account top-ups through Stripe. Subscription billing for your school runs through Stripe too. No separate gateway to wire up.",
    logo: "/integrations/stripe.svg",
    logoAlt: "Stripe logo",
  },
  {
    name: "Google Calendar",
    group: "Calendars",
    status: "available",
    blurb: "Push lessons and reservations to personal calendars.",
    detail:
      "Sync instructor and student schedules out to Google Calendar so flights show up next to everything else. Connect from Profile → Calendar on web, or Settings → Calendars in the iOS and Android apps.",
    logo: "/integrations/google-calendar.svg",
    logoAlt: "Google Calendar logo",
  },
  {
    name: "Google Meet",
    group: "Video calls on ground lessons",
    status: "available",
    blurb: "A Meet link on a ground lesson, made in one step.",
    detail:
      "Booking a ground lesson, choose Add Google Meet and the meeting is made when you save, hosted on the instructor's connected Google Calendar (or yours). Everyone on the booking gets a Join button, and the link rides along in their calendar event. A remote lesson needs no classroom.",
    logo: "/integrations/google-meet.svg",
    logoAlt: "Google Meet logo",
    learnMoreHref: "/docs/scheduling/remote-ground-lessons",
    learnMoreLabel: "Remote ground lessons",
  },
  {
    name: "Zoom",
    group: "Video calls on ground lessons",
    status: "available",
    blurb: "A Zoom meeting on a ground lesson, made in one step.",
    detail:
      "Connect Zoom once, then choose Add Zoom meeting under Video call on a ground lesson. The meeting is made when you save, hosted on the instructor's Zoom account (or yours), everyone on the booking gets a Join button that opens Zoom, and the link goes into their calendars.",
    logo: "/integrations/zoom.svg",
    logoAlt: "Zoom logo",
    learnMoreHref: "/docs/scheduling/remote-ground-lessons",
    learnMoreLabel: "Remote ground lessons",
  },
  {
    name: "Apple Calendar",
    group: "Calendars",
    status: "available",
    blurb: "Subscribe with a private ICS link.",
    detail:
      "Create a personal subscription URL from Profile → Calendar, then add it to Apple Calendar on your Mac, iPhone, or iPad. Flights refresh on their own, and you can regenerate the link anytime.",
    logo: "/integrations/apple-calendar.svg",
    logoAlt: "Apple Calendar logo",
  },
  {
    name: "Outlook",
    group: "Calendars",
    status: "available",
    blurb: "Subscribe with a private ICS link.",
    detail:
      "Use the same personal subscription URL from Profile → Calendar in Outlook on the web or desktop. Your reservations land beside the rest of your calendar, no export needed.",
    logo: "/integrations/outlook.svg",
    logoAlt: "Microsoft Outlook logo",
  },
  {
    name: "QuickBooks",
    group: "Payments and accounting",
    status: "available",
    blurb: "Paid invoices post to QuickBooks as Sales Receipts.",
    detail:
      "Connect QuickBooks Online from Settings. Paid AerScheduler invoices sync as Sales Receipts, matched to customers by email, without CSV exports.",
    logo: "/integrations/quickbooks.svg",
    logoAlt: "QuickBooks logo",
    learnMoreHref: "/resources/quickbooks-integration",
    learnMoreLabel: "How QuickBooks sync works",
  },
  {
    name: "FAA Aircraft Registry",
    group: "Aviation data",
    status: "available",
    blurb: "Type a tail number and the aircraft fills itself in.",
    detail:
      "When you add an aircraft, start typing its N-number and pick it from the FAA registry. Make, model, year, and serial number are filled in for you. Tails outside the US registry still save exactly as typed.",
    logo: "/integrations/faa-registry.svg",
    logoAlt: "Aircraft registry icon",
  },
  {
    name: "Aviation Weather",
    group: "Aviation data",
    status: "available",
    blurb: "Current METAR and daylight on upcoming flights.",
    detail:
      "Flights in the next 12 hours show the nearest station's flight category, wind, and visibility from the National Weather Service, plus sunset and civil twilight in the flight's local time. On web and in the iOS and Android apps.",
    logo: "/integrations/aviation-weather.svg",
    logoAlt: "Aviation weather icon",
  },
];


/** The hero's settings panel: a few words per integration, as the console might put it. */
const PANEL: [name: string, note: string][] = [
  ["Stripe", "Card and ACH payments"],
  ["QuickBooks", "Paid invoices synced"],
  ["Google Calendar", "Bookings on personal calendars"],
  ["Google Meet", "Links on ground lessons"],
  ["Zoom", "Links on ground lessons"],
  ["Aviation Weather", "METAR on upcoming flights"],
];

/*
 * Rebuilt 2026-10-16 in the home page's style: it was a grid of bordered icon
 * cards, the pattern Tony called "AI slop" on the home page. Now one row per
 * integration, grouped by what it is for, with a settings panel in the hero.
 */
export default function IntegrationsPage() {
  const logoOf = (name: string) => INTEGRATIONS.find((i) => i.name === name);

  return (
    <div className="bg-white text-[#0b0b0d]">
      <section className="relative isolate overflow-hidden">
        <div
          className="grid-lines pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:pb-24 lg:pt-10">
          <Breadcrumbs items={[{ name: "Integrations", href: "/integrations" }]} />
          <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-tight text-[#1b1c1f] shadow-sm sm:text-sm">
                <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                Integrations
              </p>
              <h1 className="animate-fade-up mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4rem]">
                Flight school software integrations
              </h1>
              <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-black/55 sm:text-xl">
                Payments, accounting, calendars, video calls for ground lessons, the
                FAA registry and aviation weather, connected in the same self-serve
                product on every plan, not as an enterprise add-on.
              </p>
              <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3">
                <Button href={signupUrl("quickbooks")} size="lg">
                  Start free trial
                  <ChevronRight className="size-4 opacity-80" />
                </Button>
                <Button href={DEMO_URL} size="lg" variant="secondary">
                  <PlayCircle className="size-4 opacity-80" />
                  Try the live demo
                </Button>
              </div>
            </div>
            <div className="animate-fade-up-delay-3 mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
              <Panel title="Settings · Integrations" right={<Tag color={STATUS.green}>6 connected</Tag>}>
                {PANEL.map(([name, note]) => {
                  const item = logoOf(name);
                  return (
                    <div key={name} className="flex items-center gap-3 border-t border-black/[0.05] px-4 py-3 text-[13px] first:border-t-0">
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-white p-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item?.logo} alt="" width={20} height={20} className="size-5 object-contain" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{name}</span>
                        <span className="block truncate text-black/45">{note}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[12px]" style={{ color: STATUS.green }}>
                        <Check className="size-3.5" /> Connected
                      </span>
                    </div>
                  );
                })}
              </Panel>
            </div>
          </div>
        </div>
      </section>

      {/* One row per integration, grouped by what it is for. */}
      <section aria-label="Integrations">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {GROUPS.map((group) => (
            <div key={group} className="pt-16 first:pt-4">
              <h2 className="pb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-black/35">{group}</h2>
              {INTEGRATIONS.filter((i) => i.group === group).map((item) => (
                <Reveal
                  key={item.name}
                  className="grid gap-4 border-t border-black/[0.08] py-8 md:grid-cols-[0.9fr_2fr] md:gap-12"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-white p-2 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.logo} alt={item.logoAlt} width={32} height={32} className="size-8 object-contain" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{item.name}</h3>
                      <StatusPill status={item.status} />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium leading-snug tracking-tight">{item.blurb}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-black/55">{item.detail}</p>
                    {item.learnMoreHref ? (
                      <Link
                        href={item.learnMoreHref}
                        className="mt-4 inline-flex items-center gap-1.5 text-[15px] text-black/60 hover:text-[#0b0b0d]"
                      >
                        {item.learnMoreLabel ?? "Learn more"} <span aria-hidden>→</span>
                      </Link>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          ))}

          {/* The API, which is the one thing on Enterprise. */}
          <div className="pt-16">
            <h2 className="pb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-black/35">Developers</h2>
            <Reveal className="grid gap-4 border-y border-black/[0.08] py-8 md:grid-cols-[0.9fr_2fr] md:gap-12">
              <div className="flex items-start gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-white font-mono text-[13px] font-semibold text-black/60 shadow-sm">
                  {"{ }"}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">AerScheduler API</h3>
                  <span className="mt-1 inline-block rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-semibold text-black/55">
                    Enterprise
                  </span>
                </div>
              </div>
              <div>
                <p className="text-lg font-medium leading-snug tracking-tight">A documented public REST API for your own systems.</p>
                <p className="mt-2 text-[15px] leading-relaxed text-black/55">
                  Connect your school&apos;s data to your own systems. The reference is public, so you can read it before you ask for access.
                </p>
                <Link href="/docs/api" className="mt-4 inline-flex items-center gap-1.5 text-[15px] text-black/60 hover:text-[#0b0b0d]">
                  API reference <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Something missing: a light call to action. */}
      <section aria-labelledby="integrations-request">
        <Reveal className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6 lg:py-36">
          <h2 id="integrations-request" className="text-balance text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            Need something else connected?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-black/55">
            Tell us what you use today. What we build next follows what schools ask
            for, and every integration ships to every plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={contactHref("integration")} variant="secondary" size="lg">
              Request an integration
            </Button>
          </div>
        </Reveal>
      </section>

      <PricingBand headingId="integrations-pricing-heading" />
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  return status === "available" ? (
    <span className="mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: `${STATUS.green}1f`, color: STATUS.green }}>
      Available
    </span>
  ) : (
    <span className="mt-1 inline-block rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-semibold text-black/55">
      Coming soon
    </span>
  );
}
