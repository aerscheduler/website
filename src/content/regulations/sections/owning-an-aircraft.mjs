/**
 * Plain-English summaries: Owning an aircraft. House rules for every summary
 * file are in `src/content/regulations/sections/README.md`.
 */

/** @type {import("../types").RegSummary[]} */
export default [
  {
    cite: "91.403",
    textHash: "91a9fabd2c69a758",
    description:
      "14 CFR 91.403 in plain English: the owner or operator is primarily responsible for keeping an aircraft airworthy, including its ADs and life limits.",
    answer:
      "The owner or operator is primarily responsible for keeping the aircraft airworthy, and that includes complying with every Airworthiness Directive. The mechanic does the work, but the duty to have it done sits with the owner.",
    points: [
      { text: "The owner or operator carries primary responsibility for airworthiness, including Part 39, the AD rules.", para: "a" },
      { text: "Maintenance, preventive maintenance and alterations must be done the way Part 91 Subpart E and Part 43 prescribe.", para: "b" },
      {
        text: "If the manufacturer's manual has an airworthiness limitations section, its mandatory replacement times and inspection intervals are law, not advice.",
        para: "c",
      },
      { text: "You may only alter an aircraft under a supplemental type certificate (STC) if you hold the STC or have the holder's written permission.", para: "d" },
    ],
    faqs: [
      {
        q: "If my mechanic misses an AD, whose problem is it?",
        a: "Paragraph (a) puts primary responsibility on the owner or operator, so the FAA can hold the owner responsible for an aircraft flown out of compliance. Mechanics have their own duties under Part 43, but they do not replace the owner's.",
      },
      {
        q: "Does a leaseback change who is responsible?",
        a: "The rule names the owner or operator. In a leaseback the school operating the aircraft is usually the operator, so both parties should agree in writing who arranges inspections and AD compliance.",
      },
      {
        q: "What is a permission letter for an STC?",
        a: "Paragraph (d) requires written permission from the STC holder before you install an STC you did not buy yourself. Kit sellers usually include it; a used STC kit may not come with one.",
      },
    ],
    related: ["91.405", "91.409", "39.7", "91.417"],
    links: [{ href: "/airworthiness-directives", label: "AD library" }],
  },
  {
    cite: "91.405",
    textHash: "7b4e4d5541ab4b8a",
    description:
      "14 CFR 91.405 in plain English: the owner must get the aircraft inspected, fix discrepancies between inspections, and see every return to service logged.",
    answer:
      "The owner or operator must have the aircraft inspected as Part 91 requires and have discrepancies repaired between inspections. They must also make sure the mechanic logs every return to service and placards anything left inoperative.",
    points: [
      { text: "Have the required inspections done, and get discrepancies found between them repaired under Part 43.", para: "a" },
      { text: "Make sure maintenance personnel enter the return to service in the aircraft records.", para: "b" },
      { text: "Equipment you were allowed to leave inoperative under 91.213(d)(2) must be repaired, replaced, removed or inspected at the next required inspection.", para: "c" },
      { text: "When a list of discrepancies includes inoperative equipment, make sure it carries the placard 43.11 requires.", para: "d" },
    ],
    faqs: [
      {
        q: "Can I keep deferring an inoperative item forever?",
        a: "No. Paragraph (c) says equipment deferred under 91.213(d)(2) has to be dealt with at the next required inspection, so a deferral lasts until the next annual or 100-hour at most.",
      },
      {
        q: "Who makes the logbook entry, the owner or the mechanic?",
        a: "The mechanic writes it. The owner's duty under paragraph (b) is to make sure the entry is made before the aircraft flies.",
      },
    ],
    related: ["91.403", "91.213", "43.9", "43.11"],
  },
  {
    cite: "91.407",
    textHash: "962d1ff02d191361",
    description:
      "14 CFR 91.407 in plain English: no flying after maintenance until the aircraft is approved for return to service and logged. Some work needs a test flight.",
    answer:
      "After any maintenance, preventive maintenance, rebuilding or alteration, the aircraft cannot fly until an authorized person approves it for return to service and the logbook entry is made. Work that may have changed how it flies also needs a test flight by at least a private pilot before passengers ride along.",
    points: [
      { text: "The return to service must be approved by someone 43.7 authorizes.", para: "a-1" },
      { text: "The 43.9 or 43.11 record entry must exist before the flight.", para: "a-2" },
      {
        text: "If the work may have appreciably changed the flight characteristics, a private pilot or higher flies it first, checks the work, and logs the flight. No passengers until then.",
        para: "b",
      },
      { text: "The test flight can be skipped when ground tests or inspection show conclusively that flight characteristics did not change.", para: "c" },
    ],
    faqs: [
      {
        q: "Does an oil change need a test flight?",
        a: "No. The test flight in paragraph (b) applies only when the work may have appreciably changed the flight characteristics or substantially affected operation in flight, such as control surface rigging.",
      },
      {
        q: "Can a student pilot do the operational check flight?",
        a: "No. Paragraph (b) requires an appropriately rated pilot with at least a private pilot certificate.",
      },
    ],
    related: ["43.7", "43.9", "43.11", "91.405"],
  },
  {
    cite: "91.7",
    textHash: "24e14442c47bbaa1",
    description:
      "14 CFR 91.7 in plain English: no one may fly an unairworthy aircraft, and the pilot in command decides whether it is in condition for safe flight.",
    answer:
      "No one may operate a civil aircraft that is not airworthy. The pilot in command decides whether the aircraft is in condition for safe flight and must end the flight if an unairworthy condition appears.",
    points: [
      { text: "Flying an unairworthy aircraft is prohibited outright.", para: "a" },
      { text: "The pilot in command is responsible for deciding the aircraft is safe to fly, every flight.", para: "b" },
      { text: "If a mechanical, electrical or structural problem makes it unairworthy in flight, the pilot must discontinue the flight.", para: "b" },
    ],
    faqs: [
      {
        q: "What does airworthy mean?",
        a: "The FAA reads it as two things: the aircraft conforms to its type design (including ADs and approved alterations) and it is in condition for safe operation. An overdue annual or an open AD fails the first test even if the aircraft flies fine.",
      },
      {
        q: "If the school signed the aircraft off, am I still responsible as the renter?",
        a: "Yes. Paragraph (b) makes the pilot in command responsible for determining the aircraft is in condition for safe flight, so a renter still owes a proper preflight and a look at the inspection status.",
      },
    ],
    related: ["91.403", "91.409", "91.213", "91.3"],
  },
  {
    cite: "91.9",
    textHash: "6f646ba20e587102",
    description:
      "14 CFR 91.9 in plain English: fly within the flight manual's limits, markings and placards, and keep the approved flight manual on board.",
    answer:
      "You must fly within the operating limitations in the approved flight manual and on the aircraft's markings and placards. A current approved flight manual, or the approved manual material and placards for older aircraft, has to be in the aircraft.",
    points: [
      { text: "Operating limitations in the approved Airplane or Rotorcraft Flight Manual, markings and placards are binding.", para: "a" },
      { text: "If the aircraft needs an approved flight manual under 21.5, a current one must be on board.", para: "b-1" },
      { text: "Older aircraft that do not need one must carry the approved manual material, markings and placards, or a combination.", para: "b-2" },
      { text: "The aircraft must carry its registration marks under Part 45 or 48.", para: "c" },
    ],
    faqs: [
      {
        q: "Is a photocopy of the POH enough?",
        a: "Where 21.5 requires an approved flight manual, the approved manual for that serial number must be on board. A generic information manual or a copy may not include the aircraft's own weight and balance and supplements.",
      },
      {
        q: "Do I need the weight and balance on board?",
        a: "The approved flight manual or manual material includes the aircraft's weight and balance data, which is why it is usually listed among the documents to carry.",
      },
    ],
    related: ["91.203", "91.205", "91.7"],
  },
  {
    cite: "91.203",
    textHash: "8d94ce5680866140",
    description:
      "14 CFR 91.203 in plain English: the airworthiness and registration certificates must be on board, the airworthiness certificate displayed for passengers.",
    answer:
      "Every civil aircraft must carry a current airworthiness certificate and an effective registration certificate. The airworthiness certificate has to be displayed at the cabin or cockpit entrance where passengers or crew can read it.",
    points: [
      { text: "A current airworthiness certificate showing the aircraft's registration number must be on board.", para: "a-1" },
      { text: "An effective registration certificate, or for flights within the US the second copy of the registration application, must be on board.", para: "a-2" },
      { text: "The airworthiness certificate is displayed at the cabin or cockpit entrance, legible to passengers or crew.", para: "b" },
      { text: "A fuel tank installed in the cabin or baggage compartment needs its FAA Form 337 on board.", para: "c" },
    ],
    faqs: [
      {
        q: "What is ARROW?",
        a: "A memory aid for the documents pilots check before flight: Airworthiness certificate, Registration, Radio station license (only for international flights), Operating limitations (the flight manual, 91.9) and Weight and balance. This section covers the A and the first R.",
      },
      {
        q: "Can I fly on the pink copy of the registration application?",
        a: "Within the United States, yes: paragraph (a)(2) accepts the second copy of the Aircraft Registration Application under 47.31(c) while the permanent certificate is issued.",
      },
      {
        q: "Does the registration certificate expire?",
        a: "Yes. Under 47.40 a certificate issued now expires seven years after the end of the month it was issued, and an expired certificate no longer satisfies this section.",
      },
    ],
    related: ["47.40", "91.9", "91.7"],
  },
  {
    cite: "91.205",
    textHash: "557b25941f5686aa",
    description:
      "14 CFR 91.205 in plain English: the instruments and equipment required for day VFR, night VFR and IFR, and what must be working before you fly.",
    answer:
      "A powered aircraft with a standard airworthiness certificate must have specific instruments and equipment working for each kind of flight. Day VFR has a basic list, night VFR adds lights and fuses, and IFR adds gyros, a clock and suitable radios.",
    points: [
      { text: "Everything required for the kind of operation must be installed and operable, or an FAA-approved equivalent.", para: "a" },
      {
        text: "Day VFR: airspeed indicator, altimeter, magnetic compass, tachometer, oil pressure and temperature gauges, manifold pressure for altitude engines, fuel gauges, gear position indicator, anticollision lights on airplanes certificated after March 11, 1996, seat belts, shoulder harnesses by date of manufacture, and an ELT if 91.207 requires one.",
        para: "b",
      },
      { text: "Night VFR adds position lights, anticollision lights, a landing light if flying for hire, an adequate electrical source, and spare fuses.", para: "c" },
      {
        text: "IFR adds two-way radio and navigation equipment for the route, a turn coordinator or rate-of-turn indicator, slip-skid indicator, sensitive altimeter, clock with seconds, adequate generator or alternator, attitude indicator and heading indicator.",
        para: "d",
      },
      { text: "At or above FL 240, if VOR navigation is required, DME or suitable RNAV is also required.", para: "e" },
    ],
    faqs: [
      {
        q: "What is ATOMATOFLAMES?",
        a: "A memory aid for the day VFR list in paragraph (b): Airspeed, Tachometer, Oil pressure, Manifold pressure, Altimeter, Temperature, Oil temperature, Fuel gauge, Landing gear position, Anticollision lights, Magnetic compass, ELT, Seat belts.",
      },
      {
        q: "Can I fly day VFR with a broken landing light?",
        a: "The landing light is only required at night and only when flying for hire (paragraph (c)(4)). Whether you may fly with it inoperative during the day is decided under 91.213, which also requires deactivating or removing and placarding it.",
      },
      {
        q: "Does a glass panel aircraft still need a clock?",
        a: "For IFR, paragraph (d)(6) requires a clock with hours, minutes and seconds, shown by a sweep-second pointer or a digital display. Most glass displays meet it.",
      },
    ],
    related: ["91.213", "91.207", "91.9"],
  },
  {
    cite: "91.213",
    textHash: "fe609057b7d5607f",
    description:
      "14 CFR 91.213 in plain English: when you may take off with inoperative instruments or equipment, with or without a Minimum Equipment List.",
    answer:
      "You may take off with inoperative equipment only under an approved Minimum Equipment List, or, for most small piston aircraft without one, if the item is not required for the flight, is removed or deactivated and placarded, and is judged not to be a hazard.",
    points: [
      { text: "With an approved MEL, a letter of authorization on board and a records entry, you operate under the MEL's conditions.", para: "a" },
      { text: "An MEL cannot defer equipment required for type certification, by an AD, or for the specific operation.", para: "b" },
      {
        text: "Without an MEL, non-turbine airplanes, rotorcraft, gliders and similar aircraft may fly with an item inoperative only if it is not part of the VFR-day type certification equipment, not on the equipment list or kinds of operations list, not required by 91.205 or another rule, and not required by an AD.",
        para: "d-2",
      },
      { text: "The item must be removed, with the control placarded and the work logged, or deactivated and placarded \"Inoperative\".", para: "d-3" },
      { text: "A pilot or mechanic must decide the inoperative item is not a hazard to the aircraft.", para: "d-4" },
      { text: "Anything else needs a special flight permit.", para: "e" },
    ],
    faqs: [
      {
        q: "Can a pilot placard an item inoperative?",
        a: "Paragraph (d)(3)(ii) allows deactivation and placarding, and (d)(4) lets an appropriately rated pilot make the hazard determination. If deactivating the item involves maintenance, that part must be done and recorded under Part 43.",
      },
      {
        q: "How long can the item stay inoperative?",
        a: "Under 91.405(c) it must be repaired, replaced, removed or inspected at the next required inspection.",
      },
      {
        q: "What is the kinds of operations equipment list?",
        a: "A list in many newer flight manuals of equipment required for day VFR, night VFR, IFR and icing. Paragraph (d)(2)(ii) says an item listed as required for the flight you are making cannot be deferred.",
      },
    ],
    related: ["91.205", "91.405", "43.11", "91.7"],
  },
  {
    cite: "47.40",
    textHash: "ce1904dbd8fb1247",
    description:
      "14 CFR 47.40 in plain English: aircraft registration now lasts seven years, and you can renew during the six months before it expires.",
    answer:
      "A Certificate of Aircraft Registration expires seven years after the last day of the month it was issued. You can renew it with AC Form 8050-1B and the fee during the six months before the expiration date.",
    points: [
      { text: "A registration lasts seven years, counted from the end of the month of issue.", para: "a" },
      { text: "Renew with AC Form 8050-1B and the 47.17 fee in the six months before it expires.", para: "b" },
      { text: "If the certificate's information is wrong, the FAA can require a full new application and fee before it expires.", para: "c" },
    ],
    faqs: [
      {
        q: "Didn't registration used to be three years?",
        a: "Yes. The FAA extended it to seven years in 2023. The section as current says seven years for certificates issued under 47.31.",
      },
      {
        q: "What happens if registration expires?",
        a: "The aircraft no longer has an effective registration certificate, so 91.203(a)(2) stops it from flying until it is registered again.",
      },
    ],
    related: ["91.203"],
  },
];
