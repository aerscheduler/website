/**
 * Plain-English summaries: Airworthiness Directives. Each of these Part 39
 * sections is a single sentence or two of official text, so the summaries lean
 * on what the rule means in practice. House rules are in `README.md`.
 */

const AD_LIBRARY = { href: "/airworthiness-directives", label: "AD library: search FAA Airworthiness Directives" };
const AD_GUIDE = { href: "/resources/airworthiness-directive-tracking", label: "Airworthiness Directive tracking" };

/** @type {import("../types").RegSummary[]} */
export default [
  {
    cite: "39.3",
    textHash: "833a7654ef2c5ed8",
    description:
      "14 CFR 39.3 in plain English: Airworthiness Directives are legally enforceable rules that apply to aircraft, engines, propellers and appliances.",
    answer:
      "An Airworthiness Directive is a legally enforceable FAA rule, not a recommendation. ADs apply to four kinds of product: aircraft, aircraft engines, propellers and appliances.",
    points: [
      { text: "ADs are legally enforceable rules.", para: "" },
      { text: "They apply to aircraft, engines, propellers and appliances, so an aircraft can be subject to ADs on its airframe and on every part installed on it.", para: "" },
    ],
    faqs: [
      {
        q: "Is a manufacturer's service bulletin the same as an AD?",
        a: "No. A service bulletin is the manufacturer's recommendation. It becomes mandatory for Part 91 operators only when an AD requires it, which many ADs do by reference.",
      },
      {
        q: "Why does an engine AD apply to my airplane?",
        a: "Because 39.3 makes ADs apply to engines, propellers and appliances as products in their own right. An AD on your engine model or your magnetos applies wherever that product is installed.",
      },
    ],
    related: ["39.7", "39.11", "91.403"],
    links: [AD_LIBRARY, AD_GUIDE],
  },
  {
    cite: "39.7",
    textHash: "990cfbc9ecec2cf7",
    description:
      "14 CFR 39.7 in plain English: operating an aircraft, engine, propeller or appliance that does not meet an applicable AD is a violation.",
    answer:
      "Anyone who operates a product that does not meet the requirements of an applicable Airworthiness Directive is in violation of 39.7. That makes an overdue AD a reason not to fly, and the pilot and the owner can both be held responsible.",
    points: [
      { text: "Operating a product that does not meet an applicable AD is a violation.", para: "" },
      { text: "It applies to anyone who operates it: the pilot flying it as well as the owner who keeps it.", para: "" },
    ],
    faqs: [
      {
        q: "If my AD is a few hours overdue, can I fly to the shop?",
        a: "Not under 39.7 alone. You would need a special flight permit under 39.23, unless the AD itself allows the flight.",
      },
      {
        q: "How do I know which ADs apply to my aircraft?",
        a: "By serial number, installed equipment and the aircraft's records, which is a mechanic's determination. A search by model, such as the AD library, finds the ADs worth reading; the logbook's AD status record (91.417(a)(2)(v)) shows how each was handled.",
      },
    ],
    related: ["39.3", "39.23", "91.403", "91.417"],
    links: [AD_LIBRARY, AD_GUIDE],
  },
  {
    cite: "39.11",
    textHash: "890ceea22506b280",
    description:
      "14 CFR 39.11 in plain English: what an Airworthiness Directive can require, from inspections and conditions to the actions that fix an unsafe condition.",
    answer:
      "An AD can require three kinds of thing: inspections you must carry out, conditions and limitations you must comply with, and actions you must take to resolve the unsafe condition.",
    points: [
      { text: "Inspections, often repetitive, at the intervals the AD sets.", para: "" },
      { text: "Conditions and limitations, such as placards, operating restrictions or limits on use.", para: "" },
      { text: "Actions that resolve the unsafe condition, such as replacing or modifying a part, which may end a repetitive inspection.", para: "" },
    ],
    faqs: [
      {
        q: "What is a terminating action?",
        a: "An action, usually replacing or modifying a part, that the AD says ends its repetitive inspections. Until it is done, the repetitive inspections keep coming due.",
      },
      {
        q: "Can a pilot comply with an AD?",
        a: "Some ADs allow a pilot to do a specific check, such as a fuel cap inspection, and make the record entry. Unless the AD says so, the work is maintenance and needs a mechanic.",
      },
    ],
    related: ["39.3", "39.19", "91.417"],
    links: [AD_LIBRARY],
  },
  {
    cite: "39.15",
    textHash: "46c310201b9d3713",
    description:
      "14 CFR 39.15 in plain English: an AD still applies to a product that has been modified, altered or repaired in the area the AD addresses.",
    answer:
      "Yes, an AD still applies after the product has been changed. Modifying, altering or repairing the affected area does not take an aircraft or part out of an AD that names it.",
    points: [
      { text: "An AD applies to each product it identifies, even one that has been modified, altered or repaired in the area the AD covers.", para: "" },
      { text: "If the change makes the AD's actions impossible, the way out is an alternative method of compliance under 39.19, not ignoring the AD.", para: "" },
    ],
    faqs: [
      {
        q: "My aircraft has an STC in the area the AD covers. Does the AD still apply?",
        a: "Yes, under 39.15. If the STC makes the AD's instructions unworkable, ask the FAA for an alternative method of compliance under 39.19.",
      },
    ],
    related: ["39.19", "39.7"],
    links: [AD_LIBRARY],
  },
  {
    cite: "39.19",
    textHash: "58437f75ea5b35fe",
    description:
      "14 CFR 39.19 in plain English: how to propose an alternative method of compliance (AMOC) or a different compliance time for an Airworthiness Directive.",
    answer:
      "Anyone may propose an alternative method of compliance (AMOC), or a change in compliance time, that gives an acceptable level of safety. You may use it only after the manager of the FAA office named in the AD approves it.",
    points: [
      { text: "Propose the specific actions you would take instead, or a different compliance time.", para: "" },
      { text: "Send it to your principal inspector, who forwards it with comments to the manager of the office named in the AD. You may copy the manager at the same time.", para: "" },
      { text: "Without a principal inspector, as most Part 91 owners are, send it straight to that manager.", para: "" },
      { text: "You may not use the alternative until the manager approves it.", para: "" },
    ],
    faqs: [
      {
        q: "Who is the manager identified in the AD?",
        a: "Each AD names the FAA office responsible for it, usually near the end of the AD under the heading on alternative methods of compliance, with a contact.",
      },
      {
        q: "Can I use an AMOC someone else got approved?",
        a: "Some AMOCs are approved globally for everyone; many are approved for one aircraft or operator only. Check the approval letter's scope before relying on it.",
      },
    ],
    related: ["39.15", "39.11", "39.7"],
    links: [AD_LIBRARY],
  },
  {
    cite: "39.23",
    textHash: "5a45f6e2609ac188",
    description:
      "14 CFR 39.23 in plain English: flying an aircraft with an open Airworthiness Directive to a repair facility, and getting a special flight permit.",
    answer:
      "You can usually fly an aircraft with an open AD to a place where the work can be done, but you need a special flight permit (a ferry permit) from the FAA unless your operations specifications already allow it. The AD itself can rule the flight out.",
    points: [
      { text: "Operators whose operations specifications include it may fly to a repair facility under that authority.", para: "" },
      { text: "Everyone else asks the local Flight Standards District Office for a special flight permit.", para: "" },
      { text: "The FAA may not issue one if the AD prohibits it, and may add conditions or refuse when the aircraft cannot be moved safely.", para: "" },
    ],
    faqs: [
      {
        q: "How do I get a ferry permit?",
        a: "Apply to your local FSDO for a special flight permit under Part 21. Many FSDOs accept the application online, and a mechanic usually has to inspect the aircraft and certify it safe for the flight.",
      },
      {
        q: "What if the AD says no special flight permits?",
        a: "Then 39.23 does not help. The work has to be done where the aircraft sits, or the aircraft moved by other means.",
      },
    ],
    related: ["39.7", "91.213"],
    links: [AD_LIBRARY],
  },
];
