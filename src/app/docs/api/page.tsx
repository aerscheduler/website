import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Terminal, KeyRound, Clock, Gauge } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { CodeBlock, MethodBadge, EndpointPath } from "@/components/api-docs";
import { faqJsonLd } from "@/lib/seo";
import {
  API_BASE_URL,
  API_VERSION,
  endpointCount,
  getTagDocs,
} from "@/lib/openapi";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TAGS = getTagDocs();
const COUNT = endpointCount();

export const metadata: Metadata = {
  title: "API Documentation — Flight School Scheduling API",
  description: `The ${SITE_NAME} REST API: book aircraft, close out flights, and pull billing and utilization data from your own software. ${COUNT} documented endpoints, OpenAPI 3.1, free on every plan.`,
  keywords: [
    "flight school API",
    "aircraft scheduling API",
    "flight school software API",
    "aviation scheduling REST API",
    "flight school integration",
    "aircraft booking API",
    "flight training management API",
    "OpenAPI aviation",
  ],
  alternates: { canonical: "/docs/api" },
  openGraph: {
    title: `${SITE_NAME} API Documentation`,
    description: `Book aircraft, close out flights, and pull billing data from your own software. ${COUNT} endpoints, OpenAPI 3.1.`,
    url: "/docs/api",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Does AerScheduler have an API?",
    a: `Yes. AerScheduler exposes a REST API covering ${COUNT} endpoints across scheduling, aircraft, maintenance, billing, members, and reporting. It is the same API the AerScheduler mobile app and web console use — there is no separate public tier and no second implementation to fall behind.`,
  },
  {
    q: "Is the API included in the price?",
    a: "Yes. API access is included on every plan at no extra cost. There is no enterprise tier and no per-call charge.",
  },
  {
    q: "How do I authenticate with the AerScheduler API?",
    a: "With an API key, and only with an API key. Create one in the web console under Settings → API keys, then send it as an Authorization: Bearer header on every request. The secret is shown once, when you create it, so store it then — only a hash is kept.",
  },
  {
    q: "Who can create an API key?",
    a: "Any administrator, from Settings → API keys in the web console. That is deliberately not something a key can do: a key cannot create or revoke another key, even one holding the admin role, so a leaked key can never issue itself replacements.",
  },
  {
    q: "What can an API key do?",
    a: "Exactly what the roles you gave it allow. A key behaves like a member holding those roles, and every permission rule that applies to a person applies to it. Give a key the least it needs — a key that reads the schedule should be a dispatcher, not an admin. The owner role cannot be granted to a key.",
  },
  {
    q: "Do keys expire?",
    a: "Only if you set an expiry when you create one. Otherwise a key works until you revoke it, which takes effect on the very next request. Revoked keys stay listed as revoked rather than disappearing, so anything they created still has something to point at.",
  },
  {
    q: "Is there an OpenAPI specification?",
    a: `Yes. The machine-readable OpenAPI 3.1 document is published at ${API_BASE_URL}/openapi.json and needs no authentication to read. Point any standard client generator at it to produce an SDK in your language.`,
  },
  {
    q: "Are there rate limits?",
    a: "Yes, and they are applied per signed-in account rather than per IP, so a whole school behind one office address does not share one budget. 300 requests a minute and 5,000 an hour per account. Every response carries RateLimit-Remaining, and a 429 carries Retry-After.",
  },
  {
    q: "Can I use the API to build a booking page on my own website?",
    a: "Yes. Availability, resources, and reservations are all exposed, so you can check an aircraft's free windows and create a booking from your own front end.",
  },
];

const QUICK_FACTS = [
  { icon: KeyRound, label: "Auth", value: "API key, no expiry by default" },
  { icon: Terminal, label: "Format", value: "JSON over HTTPS, OpenAPI 3.1" },
  { icon: Gauge, label: "Limits", value: "300/min per account" },
  { icon: Clock, label: "Version", value: `v${API_VERSION}` },
];

export default function ApiDocsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: `${SITE_NAME} API Documentation`,
          description: metadata.description,
          url: `${SITE_URL}/docs/api`,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          about: { "@type": "SoftwareApplication", name: `${SITE_NAME} API`, applicationCategory: "BusinessApplication" },
          proficiencyLevel: "Beginner",
        }}
      />

      <article>
        <div className="relative overflow-hidden border-b border-border">
          <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
            <Breadcrumbs items={[{ name: "API documentation", href: "/docs/api" }]} />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              AerScheduler API
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Everything the app and the console can do, your own software can do too — book aircraft,
              close flights out, invoice them, and pull the numbers back. {COUNT} endpoints, described
              in OpenAPI 3.1, included on every plan.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              This is the same API our own clients use. There is no separate &ldquo;public&rdquo; tier and
              no second implementation to fall behind.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#quickstart" size="lg">
                Quickstart
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href={`${API_BASE_URL}/openapi.json`} variant="secondary" size="lg">
                OpenAPI spec
              </Button>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {QUICK_FACTS.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-border bg-white/70 p-4">
                  <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <fact.icon className="size-3.5" aria-hidden />
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6" id="quickstart">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Quickstart</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            One credential, then you&rsquo;re working. An administrator creates a key in the console
            under <strong className="text-foreground">Settings &rarr; API keys</strong> — the secret
            is shown once, right there — and every request after that just carries it. No sign-in
            step in your integration, and no token to refresh.
          </p>

          <div className="mt-6 space-y-4">
            <CodeBlock
              label="1 — Store the key"
              code={`# An administrator creates it in the console:
#   Settings → API keys → Create key
# The secret is shown once, right there.

export AERSCHEDULER_KEY=ask_live_…`}
            />
            <CodeBlock
              label="2 — List your aircraft"
              code={`curl -s ${API_BASE_URL}/resources/planes \\
  -H "Authorization: Bearer $AERSCHEDULER_KEY"

# → { "data": [ { "id": 12, "name": "N12345", … } ],
#     "pagination": { "total": 6, "hasMore": false, … } }`}
            />
            <CodeBlock
              label="3 — Book one"
              code={`curl -s -X POST ${API_BASE_URL}/reservations \\
  -H "Authorization: Bearer $AERSCHEDULER_KEY" \\
  -H 'Content-Type: application/json' \\
  -d '{
    "title": "Discovery flight",
    "type": "dual",
    "start": "2026-08-04T15:00:00-06:00",
    "end":   "2026-08-04T17:00:00-06:00",
    "timeZoneName": "America/Denver",
    "resource": { "id": 12 }
  }'`}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        <div className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Reference</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {COUNT} endpoints across {TAGS.length} areas. Every one was exercised against a live
              server before publishing, so the status codes here are observed rather than assumed.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TAGS.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/docs/api/${tag.slug}`}
                  className="group rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground">{tag.name}</h3>
                    <span className="shrink-0 text-xs text-muted-foreground">{tag.endpoints.length}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{tag.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {[...new Set(tag.endpoints.map((e) => e.method))].map((method) => (
                      <MethodBadge key={method} method={method} />
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Conventions</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              These hold across the whole API, so you can write one client wrapper and stop thinking
              about it.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Convention title="Responses are wrapped">
                A body-bearing success is <Code>{`{ "data": … }`}</Code>. An error is{" "}
                <Code>{`{ "message": "…" }`}</Code>, written to be safe to show a user. Three endpoints
                break this on purpose and say so: <Code>/health</Code>, the CSV export, and the OAuth
                redirects.
              </Convention>
              <Convention title="401 and 403 mean different things">
                <Code>401</Code> means the token is dead — get a new one. <Code>403</Code> means the
                token is fine and the answer is still no. Retrying a <Code>403</Code> will never help.
              </Convention>
              <Convention title="Your organization is implied">
                The token carries it. You never pass an organization id for your own org, and you can
                never read another organization&rsquo;s records.
              </Convention>
              <Convention title="Money is in cents">
                Always an integer, never a float. A $165/hr wet rate is <Code>16500</Code>.
              </Convention>
              <Convention title="Times carry an offset">
                Send <Code>start</Code> and <Code>end</Code> with an explicit UTC offset or{" "}
                <Code>Z</Code>. A bare local datetime is rejected rather than silently booked in the
                server&rsquo;s zone — see below.
              </Convention>
              <Convention title="Parse leniently">
                New endpoints and new fields on existing responses ship without notice. Ignore fields
                you don&rsquo;t recognise; anything that would break a working integration gets a new
                major version first.
              </Convention>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        <div className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              Time zones, and why bookings are strict about them
            </h2>
            <div className="mt-4 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground">
              <p>
                Scheduling is anchored to the <strong className="text-foreground">airport&rsquo;s</strong>{" "}
                time zone, not the caller&rsquo;s device. A booking made for 7am at the field is 7am at
                the field whether the person making it is in the office, at home, or in another state.
              </p>
              <p>
                So <Code>start</Code> and <Code>end</Code> must carry an explicit UTC offset or{" "}
                <Code>Z</Code>. A bare <Code>2026-08-04T15:00:00</Code> is rejected outright: it would
                be read in the server&rsquo;s zone and silently book a different instant than the person
                picked, and nothing downstream would notice. Send <Code>timeZoneName</Code> — an IANA
                zone like <Code>America/Denver</Code> — alongside, so the booking records which zone it
                was made in.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              Who can book what
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Which reservation <Code>type</Code> a caller may create depends on the roles they hold.
              Roles are additive, so an instructor who is also a technician gets both sets.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2.5 pr-4 font-semibold text-foreground">Role</th>
                    <th className="py-2.5 font-semibold text-foreground">May create</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["owner, admin, dispatcher", "solo, dual, ground, guest, sim, rental, maintenance"],
                    ["instructor", "solo, dual, ground, guest, sim"],
                    ["student", "solo, dual, ground, sim"],
                    ["renter", "rental"],
                    ["technician", "maintenance"],
                  ].map(([role, types]) => (
                    <tr key={role} className="border-b border-border/70 last:border-0">
                      <td className="py-2.5 pr-4 font-medium text-foreground">{role}</td>
                      <td className="py-2.5 font-mono text-[13px] text-muted-foreground">{types}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        <div className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Rate limits</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Limits are applied per signed-in account, not per IP — a whole school behind one office
              address does not share one budget.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-sm">
                <tbody>
                  {[
                    ["Per account", "300 requests / minute, 5,000 / hour"],
                    ["Unauthenticated", "100 requests / 5 minutes, per IP"],
                    ["Unauthenticated endpoints", "Tighter still, and limited per IP"],
                  ].map(([what, limit]) => (
                    <tr key={what} className="border-b border-border/70 last:border-0">
                      <td className="w-56 py-2.5 pr-4 font-medium text-foreground">{what}</td>
                      <td className="py-2.5 text-muted-foreground">{limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Every response carries <Code>RateLimit-Limit</Code>, <Code>RateLimit-Remaining</Code>, and{" "}
              <Code>RateLimit-Reset</Code>. A <Code>429</Code> carries <Code>Retry-After</Code> in
              seconds — honour it rather than retrying on a fixed interval.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              Pagination — what to know before you build
            </h2>
            <div className="mt-4 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground">
              <p>
                Every list is capped at <strong className="text-foreground">1,000 rows</strong>, whether
                or not you ask for a limit. Pass <Code>limit</Code> and <Code>offset</Code> to page:
              </p>
              <CodeBlock
                label="Page through a list"
                code={`GET /reservations?startDate=…&endDate=…&limit=100&offset=200`}
              />
              <p>
                Every list response carries a <Code>pagination</Code> object beside <Code>data</Code>:
              </p>
              <CodeBlock
                label="Shape"
                code={`{
  "data": [ … ],
  "pagination": {
    "total": 7823,
    "limit": 1000,
    "offset": 0,
    "returned": 1000,
    "hasMore": true
  }
}`}
              />
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <Code>total</Code> — how many there are in all, before the page was taken.
                </li>
                <li>
                  <Code>returned</Code> — how many are in <Code>data</Code> right now.
                </li>
                <li>
                  <Code>hasMore</Code> — whether another page exists.{" "}
                  <strong className="text-foreground">Check it.</strong> Some collections are bigger
                  than one page — our largest school has over 7,000 reservations.
                </li>
              </ul>
              <p>
                Asking for more than 1,000 gives you 1,000 rather than an error.{" "}
                <Code>offset</Code> past the end returns an empty <Code>data</Code> and{" "}
                <Code>hasMore: false</Code>. Date-ranged endpoints still matter for anything that grows
                without bound: <Code>GET /reservations</Code> requires a window, and the reporting
                engine takes one too. Cursor pagination is planned and will be additive —{" "}
                <Code>limit</Code>/<Code>offset</Code> will keep working.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        <div className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              Common questions
            </h2>
            <dl className="mt-8 space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border-b border-border pb-6 last:border-0">
                  <dt className="text-base font-semibold text-foreground">{faq.q}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              Building something?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Tell us what you&rsquo;re integrating and we&rsquo;ll help. If an endpoint you need
              doesn&rsquo;t exist yet, we&rsquo;d rather hear it now than read about it later.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/contact" size="lg">
                Talk to us
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/docs/api/reservations" variant="secondary" size="lg">
                Browse the reference
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function Convention({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[13px] text-foreground">{children}</code>
  );
}
