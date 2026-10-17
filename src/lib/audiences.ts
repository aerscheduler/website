/**
 * Who AerScheduler is for, one line each with the page that backs it.
 *
 * One list for every place that says it: the home page's audience strip and the
 * "Who it is for" line in `/llms.txt` (`lib/llms.ts`), so an AI assistant and a
 * visitor read the same five audiences in the same words.
 */
export const AUDIENCES: { title: string; body: string; href: string }[] = [
  {
    title: "Part 61 flight schools",
    body: "Book, fly, bill and log a lesson without the desk juggling three tools.",
    href: "/features/scheduling",
  },
  {
    title: "Part 141 programs",
    body: "Stages, stage checks and certified training records on one syllabus.",
    href: "/features/training",
  },
  {
    title: "Flying clubs",
    body: "Members book themselves, dues collect monthly, balances stay current.",
    href: "/features/memberships",
  },
  {
    title: "Aircraft rental",
    body: "Checkouts and currency checked before every booking, billed off the meters.",
    href: "/features/compliance",
  },
  {
    title: "Maintenance shops",
    body: "Work orders on customers' aircraft, approved by the owner, billed at your rates.",
    href: "/features/work-orders",
  },
];
