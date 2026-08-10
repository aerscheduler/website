import type { Metadata } from "next";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "Flying Club Dues and Joining Fees: How Clubs Structure Them";
const PATH = "/resources/flying-club-dues-and-fees";

export const metadata: Metadata = {
  title: TITLE,
  description: `What flying clubs actually charge to join and to stay: joining fees, monthly dues, membership tiers, and how clubs handle members who join mid-month or take a season off. From ${SITE_NAME}.`,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description:
      "Joining fees, monthly dues, tiers, and the awkward cases: mid-month joiners, seasonal members, and members who leave.",
    url: PATH,
  },
};

/**
 * The tiers almost every club converges on, whatever it calls them.
 *
 * Ranges are what clubs publish on their own membership pages, not invented figures. The
 * point of the table is the SHAPE: that a club needs several tiers rather than one price,
 * because that is the thing a club has to recognise before "tiers are plans" means anything.
 */
const TIERS = [
  {
    name: "Full or active member",
    what: "Full flying privileges on the whole fleet, and usually a vote at the annual meeting.",
    typical: "Joining fee $200–$1,000+, dues $50–$150 a month",
  },
  {
    name: "Associate or affiliate",
    what: "Flies less, books later, or is limited to part of the fleet. Often no joining fee, as a way in for someone not ready to commit.",
    typical: "Dues $25–$60 a month",
  },
  {
    name: "Social or supporting",
    what: "Clubhouse, events and the newsletter, with no flying privileges. Keeps retired and grounded members attached to the club.",
    typical: "Dues $25 a month, or an annual figure",
  },
  {
    name: "Family or household",
    what: "A second member of the same household at a reduced rate, sharing the primary member's standing.",
    typical: "A discount on the full rate rather than a tier of its own",
  },
  {
    name: "Student member",
    what: "A reduced rate while training, converting to full on the checkride.",
    typical: "Often dues only, with the joining fee deferred or waived",
  },
];

/**
 * The cases that break a naive setup.
 *
 * Every one of these is a real complaint about club software rather than a hypothetical.
 * They are the reasons a club that "just needs a monthly charge" ends up back on a
 * spreadsheet within a year.
 */
const EDGE_CASES = [
  {
    case: "Somebody joins on the 20th",
    problem:
      "Charging a full month for eleven days annoys the newest member you have. Waiting until the 1st gives away most of a month.",
    answer:
      "Charge the part-month. Twelve days at $95 a month is $36.77, then the full amount from the 1st, and the invoice says it is a part period, so nobody has to ask.",
  },
  {
    case: "A member is away for the winter",
    problem:
      "Cancelling loses their history and their seniority. Leaving them billed means they come back owing four months for an aircraft they never flew.",
    answer:
      "Pause the membership. The record stays exactly where it is, nothing accrues while they are away, and resuming does not backfill the months they missed.",
  },
  {
    case: "The club raises its dues",
    problem:
      "Changing the price cannot quietly re-price somebody who joined at the old rate. That is a conversation, not a database update.",
    answer:
      "A membership keeps the price it started at. Raising the plan changes it for new members; moving an existing member to the new rate is a separate, deliberate action, effective from their next period.",
  },
  {
    case: "A member leaves and comes back",
    problem:
      "Reusing the old record either revives a dormant billing schedule or loses the fact that they were a member before.",
    answer:
      "The old membership stays closed, with its end date and reason. Rejoining starts a new one, so the club can still answer how long they were away and what they paid before.",
  },
  {
    case: "The board comps a month",
    problem:
      "A month somebody deleted is indistinguishable from a month nobody ever billed, and it comes back at the next audit.",
    answer:
      "Waive the period. It stays on the record as deliberately not charged, with the reason, so nothing chases it later.",
  },
];

const FAQS = [
  {
    q: "What is the difference between a joining fee and dues?",
    a: "A joining fee is one-time, paid on the way in. Clubs call it an initiation fee, an application fee, or a buy-in. Dues are recurring, and are what keep the aircraft insured, hangared, and reserved for maintenance whether anybody flies or not. Most clubs charge both; plenty charge only one. A capital buy-in that makes you a part owner of the aircraft is a different thing again, and is usually handled outside the billing system because it is refundable when you leave.",
  },
  {
    q: "How much do flying clubs charge in monthly dues?",
    a: "Published rates at ordinary general-aviation clubs usually fall between $50 and $150 a month for a full flying membership, with non-flying or social tiers around $25. Equity clubs that own their aircraft outright sit higher, and clubs with a large membership sharing a small fleet sit lower. What matters more than the figure is that dues cover the fixed costs (insurance, hangar, annual, engine reserve) so that the hourly rate only has to cover flying.",
  },
  {
    q: "Should dues be monthly, quarterly or annual?",
    a: "Monthly is much the most common, because it matches how the club's own bills arrive and keeps the amount small enough not to be a decision. Quarterly cuts the admin if you are billing by hand. Annual suits social and supporting tiers, where the amount is small and a monthly invoice costs more attention than it collects.",
  },
  {
    q: "Should everyone be billed on the same day, or on their own anniversary?",
    a: "Clubs overwhelmingly bill everyone on the same date (usually the 1st) because the treasurer wants one run, one reconciliation and one figure to report at the board meeting. FBOs and schools with rolling sign-ups more often bill each account on its own anniversary. Both work; billing everyone on the same day is the one that makes proration worth having.",
  },
  {
    q: "Do dues usually include flying time?",
    a: "Sometimes. A club may include an hour or two a month, or credit unused dues against flying. It is worth being clear that this is a different mechanism from dues themselves: it needs an account balance that flying draws down, rather than a recurring charge. If your club does this, say so when you set up, because it changes what you need.",
  },
  {
    q: "What happens when a member does not pay?",
    a: `In ${SITE_NAME} an unpaid invoice can ground a member automatically, so the same rule that stops someone flying on an expired medical stops them flying on unpaid dues. The threshold is yours to set, and grounding is visible on the board rather than being a silent booking failure.`,
  },
  {
    q: "Can members sign up and pay online themselves?",
    a: "Members pay online. Dues and joining fees arrive as ordinary invoices with a payment link, and a saved card can settle them automatically. Joining is deliberately not self-service. Putting somebody on a plan is a decision the club makes, usually after a checkout and a signed agreement, so a member cannot add, change, or cancel their own membership.",
  },
];

export default function Page() {
  return (
    <>
      {/* Breadcrumbs emits its own BreadcrumbList JSON-LD, so only the FAQ needs one here. */}
      <JsonLd data={faqJsonLd(FAQS)} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Resources", href: "/resources" },
            { name: "Flying club dues & fees", href: PATH },
          ]}
        />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Flying club dues and joining fees
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          What clubs charge to join and to stay, how the tiers usually break down, and the five
          awkward cases that decide whether collecting dues is a five-minute job or a Saturday
          morning.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Two charges, doing two jobs</h2>
          <p className="text-muted-foreground">
            A <strong>joining fee</strong> is paid once. It covers the work of bringing somebody
            in (the checkout, the paperwork, adding them to the insurance) and it makes joining
            a decision rather than a whim, which is most of why clubs charge one.
          </p>
          <p className="text-muted-foreground">
            <strong>Dues</strong> are recurring, and they exist because an aircraft costs money
            in the months nobody flies it. Insurance, hangar, the annual, the engine reserve and
            the database subscriptions arrive whether the weather cooperated or not. A club that
            tries to recover all of that in the hourly rate ends up with a rate that looks
            expensive next to the school down the field, and a cash-flow problem every winter.
          </p>
          <p className="text-muted-foreground">
            The two are independent. Plenty of clubs charge dues and no joining fee; a few charge
            a joining fee and nothing after.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">The tiers clubs settle on</h2>
          <p className="text-muted-foreground">
            Almost no club has one membership. The names vary; the shape does not. The
            reason is usually retention. A member whose medical lapses, or whose job takes them
            away for a year, is far more likely to come back if there is a cheaper tier to move
            to than if the only options are full price or leaving.
          </p>

          <div className="mt-6 space-y-4">
            {TIERS.map((tier) => (
              <div key={tier.name} className="rounded-lg border p-4">
                <h3 className="font-medium">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tier.what}</p>
                <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Typically: </span>
                  {tier.typical}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Figures are what clubs publish on their own membership pages and vary widely by
            region, fleet and whether the club owns its aircraft. Treat them as a shape, not a
            benchmark.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            The five cases that decide whether this is easy
          </h2>
          <p className="text-muted-foreground">
            Charging every member the same amount on the same day is straightforward. What makes
            dues a chore is everything that is not that, and it is worth knowing how your
            software handles each before you have thirty members rather than three.
          </p>

          <div className="mt-6 space-y-4">
            {EDGE_CASES.map((item) => (
              <div key={item.case} className="rounded-lg border p-4">
                <h3 className="font-medium">{item.case}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.problem}</p>
                <p className="mt-2 flex gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item.answer}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Keeping dues and flying in one place
          </h2>
          <p className="text-muted-foreground">
            The practical argument for collecting dues in the same system that schedules the
            aircraft is not that it saves a login. It is that a member has one account and one
            balance. Dues, joining fees and flying appear in the same invoice list, settle with
            the same saved card, and land in the same monthly revenue figure, so the question
            &ldquo;is this member paid up?&rdquo; has one answer instead of two.
          </p>
          <ul className="space-y-2">
            {[
              "Dues and joining fees are ordinary invoices, with the same payment link members already use",
              "They flow into revenue reporting and the QuickBooks sync with everything else",
              "A membership report shows who is on what, what it adds up to over a year, and who is behind",
              "Unpaid invoices can ground a member on the schedule, the same as any other requirement",
              "Every period is on the record: billed, waived, or still owed",
            ].map((line) => (
              <li key={line} className="flex gap-2 text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">A note on signed agreements</h2>
          <p className="text-muted-foreground">
            Most clubs pair joining with a signed document: bylaws, an operating agreement, a
            rental agreement. {SITE_NAME} does not collect signatures today, so it will not
            pretend to. A membership records whether the agreement is <em>on file</em>, as a
            note for the office, and nothing is blocked either way. If signing matters to your
            club, keep doing it the way you do now and tick the box when the paperwork is in.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Questions</h2>
          <dl className="space-y-5">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <dt className="font-medium">{faq.q}</dt>
                <dd className="mt-1 text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 rounded-lg border bg-muted/30 p-6">
          <h2 className="text-xl font-semibold tracking-tight">Set your tiers up in an evening</h2>
          <p className="mt-2 text-muted-foreground">
            {TRIAL_DAYS} days, no card. Add your plans, put your members on them, and let the
            1st of the month look after itself.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href={signupUrl("billing")} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="/features/memberships" variant="secondary" size="lg">
              See how memberships work
            </Button>
          </div>
        </section>
      </article>
    </>
  );
}
