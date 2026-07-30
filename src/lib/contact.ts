/**
 * Contact form topics.
 *
 * These values are the contract with the API's `POST /contact` — the labels
 * live on the server too (src/routes/contact.ts), which is what gets written
 * into the support email. Adding a topic here is safe on its own: the server
 * files anything it doesn't recognize under "Something else" rather than
 * rejecting it, so the site can ship first.
 */
export const CONTACT_TOPICS = [
  { value: "not-sure", label: "Not sure where to start" },
  { value: "product", label: "Product question" },
  { value: "integration", label: "Integration request" },
  { value: "feature", label: "Feature request" },
  { value: "migration", label: "Switching systems" },
  { value: "billing", label: "Billing or account" },
  { value: "other", label: "Something else" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export function isContactTopic(value: string): value is ContactTopic {
  return CONTACT_TOPICS.some((topic) => topic.value === value);
}

/** Deep link that lands on the form with a topic preselected. */
export function contactHref(topic?: ContactTopic): string {
  return topic ? `/contact?topic=${topic}` : "/contact";
}
