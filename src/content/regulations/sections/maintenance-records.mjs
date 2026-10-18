/**
 * Plain-English summaries: Maintenance and records. House rules are in
 * `README.md` beside this file.
 */

/** @type {import("../types").RegSummary[]} */
export default [
  {
    cite: "91.417",
    textHash: "2f4cc9680be9c407",
    description:
      "14 CFR 91.417 in plain English: the two kinds of maintenance records an owner must keep, how long to keep each, and what transfers when the aircraft is sold.",
    answer:
      "An owner keeps two kinds of records. Work records (what was done, when, and who signed it) are kept until the work is repeated or superseded, or for a year. Status records (total time, life-limited parts, overhaul times, inspection status, AD status and Form 337s) stay with the aircraft for good and transfer when it is sold.",
    points: [
      {
        text: "Work records: every maintenance, preventive maintenance, alteration and required inspection, with a description, the completion date, and the signature and certificate number of whoever approved the return to service.",
        para: "a-1",
      },
      {
        text: "Status records: total time in service of the airframe, each engine, propeller and rotor; life-limited parts; time since overhaul of items with an overhaul interval; and current inspection status.",
        para: "a-2",
      },
      { text: "AD status: for each applicable AD, the method of compliance, the AD number and revision date, and when the next action is due if it recurs.", para: "a-2-v" },
      { text: "A copy of the Form 337 for each major alteration to the airframe and currently installed engines, rotors, propellers and appliances.", para: "a-2-vi" },
      { text: "Work records are kept until the work is repeated or superseded, or for 1 year after it was done.", para: "b-1" },
      { text: "Status records are kept and transferred with the aircraft when it is sold.", para: "b-2" },
      { text: "A list of discrepancies from an inspection is kept until the defects are fixed and the aircraft is returned to service.", para: "b-3" },
      { text: "Records must be shown to the FAA or the NTSB on request. Transponder and pitot-static test records are excluded from this section.", para: "c" },
    ],
    faqs: [
      {
        q: "Can I throw away old logbooks after a year?",
        a: "Only the entries for work that has been repeated or superseded, and owners rarely do, because the status records in (a)(2) depend on them and buyers expect complete logbooks. The status information itself never expires while you own the aircraft.",
      },
      {
        q: "Does a tracking spreadsheet or app count as the record?",
        a: "A tracking system can hold the current status, but the work records need the signature and certificate number of the person who approved the return to service. That signed entry, usually in the logbook, is the record.",
      },
      {
        q: "What does an AD status record need to show?",
        a: "Each applicable AD, its number and revision date, how it was complied with, and, for a recurring AD, the time and date the next action is due.",
      },
    ],
    related: ["91.419", "43.9", "43.11", "39.7"],
    links: [{ href: "/resources/aircraft-maintenance-records", label: "Aircraft maintenance records: the two lists in 91.417" }],
  },
  {
    cite: "91.419",
    textHash: "a469b4dfa296e62d",
    description: "14 CFR 91.419 in plain English: which maintenance records a seller must hand to the buyer when a US-registered aircraft is sold.",
    answer:
      "Whoever sells a US-registered aircraft must give the buyer its status records from 91.417(a)(2) at the time of sale, and its work records too, although the buyer can let the seller keep physical custody of those.",
    points: [
      { text: "The status records (total time, life-limited parts, overhaul times, inspection and AD status, Form 337s) go to the buyer at the sale.", para: "a" },
      { text: "The work records go too, unless the buyer agrees the seller may keep physical custody of them.", para: "b" },
      { text: "Even then, the buyer is responsible for making the records available to the FAA and NTSB.", para: "b" },
      { text: "Records may be handed over in plain language or coded form, at the buyer's choice.", para: "a" },
    ],
    faqs: [
      {
        q: "The seller lost a logbook. What now?",
        a: "The rule requires the seller to transfer the records, but it cannot recreate missing ones. A missing logbook usually means reconstructing status from other sources, a large inspection, and a lower price.",
      },
    ],
    related: ["91.417", "91.421"],
  },
  {
    cite: "91.421",
    textHash: "e615fc17e7fc88c7",
    description:
      "14 CFR 91.421 in plain English: a factory-rebuilt engine may start a new logbook at zero time, and what the rebuilder must enter in it.",
    answer:
      "An engine rebuilt by its manufacturer, or by an agency the manufacturer approves, may start a new maintenance record with no previous history. That is what zero time means; an overhauled engine does not qualify.",
    points: [
      { text: "A manufacturer-rebuilt engine may use a new record without previous operating history.", para: "a" },
      { text: "The rebuilder enters the rebuild date, each change made for ADs, and service bulletin changes where the bulletin asks for an entry.", para: "b" },
      {
        text: "Rebuilt means disassembled, inspected, repaired, reassembled and tested to the same tolerances as a new engine, with every part meeting new-part limits or approved oversize or undersize.",
        para: "c",
      },
    ],
    faqs: [
      {
        q: "Is an overhauled engine zero time?",
        a: "No. Only a rebuilt engine, as defined in paragraph (c) and done by the manufacturer or its approved agency, gets a new record. An overhauled engine keeps its history and is described by time since overhaul.",
      },
    ],
    related: ["91.417", "91.419"],
  },
  {
    cite: "43.3",
    textHash: "3b1e7a2231cad723",
    description:
      "14 CFR 43.3 in plain English: who may perform maintenance, including the preventive maintenance a pilot may do on an aircraft they own or operate.",
    answer:
      "Maintenance may be done by certificated mechanics and repairmen, repair stations, air carriers and manufacturers, and by people working under a mechanic's direct supervision. A pilot may do preventive maintenance on an aircraft they own or operate, as long as it is not used under Parts 121, 129 or 135.",
    points: [
      { text: "The work that counts as a major alteration, a major repair or preventive maintenance is listed in Appendix A.", para: "a" },
      { text: "Certificated mechanics and repairmen work under the privileges of Part 65.", para: "b" },
      {
        text: "Someone without a certificate may work under a mechanic's supervision if the mechanic watches closely enough and is readily available in person. That never covers the required inspections.",
        para: "d",
      },
      { text: "Repair stations, air carriers and manufacturers each work under their own rules.", para: "e" },
      {
        text: "A pilot certificate holder, other than sport pilot, may do preventive maintenance on an aircraft they own or operate that is not used under Parts 121, 129 or 135.",
        para: "g",
      },
      { text: "Avionics database updates loaded from the flight deck without tools or disassembly are not maintenance, and pilots may do them.", para: "k" },
    ],
    faqs: [
      {
        q: "Can a renter or student do preventive maintenance on a school airplane?",
        a: "Paragraph (g) requires the pilot to own or operate the aircraft. A renter is usually not the operator of a school's aircraft, so most schools leave preventive maintenance to their mechanic.",
      },
      {
        q: "Can my friend help me with an oil change under my A&P's supervision?",
        a: "Under (d), yes, if the mechanic personally observes enough to be sure it is done properly and is readily available in person. The mechanic then signs for it.",
      },
      {
        q: "Who signs off preventive maintenance a pilot does?",
        a: "The pilot, under 43.7(f), with a logbook entry that meets 43.9.",
      },
    ],
    related: ["43-appendix-a", "43.7", "43.9"],
  },
  {
    cite: "43.7",
    textHash: "6582fb2f7ccad255",
    description:
      "14 CFR 43.7 in plain English: who may approve an aircraft for return to service after maintenance, including a pilot after preventive maintenance.",
    answer:
      "Only certain people may sign an aircraft back into service after maintenance: mechanics and Inspection Authorization holders within Part 65, repair stations, manufacturers for their own work, air carriers, and a private pilot or higher after preventive maintenance they did themselves.",
    points: [
      { text: "Mechanics and IA holders approve returns to service within their Part 65 privileges.", para: "b" },
      { text: "Repair stations approve within Part 145.", para: "c" },
      { text: "Manufacturers approve work they did under 43.3(j), using approved data except for minor alterations.", para: "d" },
      { text: "A private pilot or higher may approve the return to service after doing preventive maintenance under 43.3(g).", para: "f" },
      { text: "A sport pilot may do the same only on a light-sport aircraft they own or operate.", para: "h" },
    ],
    faqs: [
      {
        q: "Who can sign off an annual inspection?",
        a: "A mechanic holding an Inspection Authorization, under the Part 65 privileges this section refers to, or a repair station or manufacturer authorized for it.",
      },
      {
        q: "Can a student pilot sign off preventive maintenance?",
        a: "No. Paragraph (f) requires at least a private pilot certificate.",
      },
    ],
    related: ["43.3", "43.9", "91.407"],
  },
  {
    cite: "43.9",
    textHash: "71afa45888262382",
    description:
      "14 CFR 43.9 in plain English: what a logbook entry for maintenance, preventive maintenance or an alteration must contain, and when a Form 337 is needed.",
    answer:
      "Whoever does maintenance, preventive maintenance or an alteration makes a logbook entry with a description of the work, the date it was completed, the name of who did it, and the signature, certificate number and kind of certificate of whoever approved it. Major repairs and alterations also need a Form 337.",
    points: [
      { text: "Describe the work, or reference data acceptable to the FAA.", para: "a-1" },
      { text: "The date the work was completed.", para: "a-2" },
      { text: "The name of the person who did the work, if different from the person approving it.", para: "a-3" },
      { text: "The approving person's signature, certificate number and kind of certificate. The signature approves the return to service for that work only.", para: "a-4" },
      { text: "Inspections are logged under 43.11 instead.", para: "c" },
      { text: "Major repairs and alterations are also recorded on a form (the FAA Form 337) under Appendix B.", para: "d" },
    ],
    faqs: [
      {
        q: "Does a pilot doing an oil change need a logbook entry?",
        a: "Yes. Preventive maintenance is covered by paragraph (a), so the pilot makes the entry with the description, date, signature, certificate number and kind of certificate.",
      },
      {
        q: "What is a Form 337?",
        a: "FAA Form 337, Major Repair and Alteration, the form Appendix B prescribes for major repairs and alterations. The owner keeps a copy under 91.417(a)(2)(vi).",
      },
    ],
    related: ["43.11", "91.417", "43.7"],
  },
  {
    cite: "43.11",
    textHash: "4e098e5ebd15725d",
    description:
      "14 CFR 43.11 in plain English: what an annual, 100-hour or progressive inspection entry must say, and the list of discrepancies when an aircraft fails.",
    answer:
      "After an annual, 100-hour or other required inspection, the inspector logs the type and extent of the inspection, the date and total time, their signature and certificate, and a statement that the aircraft is airworthy or that a list of discrepancies was given to the owner.",
    points: [
      { text: "Log the type of inspection and a brief description of its extent.", para: "a-1" },
      { text: "Log the date and the aircraft's total time in service.", para: "a-2" },
      { text: "Sign with certificate number and kind of certificate, whether approving or disapproving.", para: "a-3" },
      {
        text: "An airworthy aircraft gets a statement such as: \"I certify that this aircraft has been inspected in accordance with (type) inspection and was determined to be in airworthy condition.\"",
        para: "a-4",
      },
      { text: "A failed aircraft gets a statement that a dated list of discrepancies and unairworthy items was given to the owner.", para: "a-5" },
      { text: "The owner receives that signed, dated list; items allowed to stay inoperative under 91.213(d)(2) are placarded \"Inoperative\" and added to it.", para: "b" },
    ],
    faqs: [
      {
        q: "Does a failed annual mean the inspection has to be redone?",
        a: "No. The annual is complete with a discrepancy list. Once the listed items are fixed and signed off under 43.9, the aircraft can be returned to service without starting the inspection over.",
      },
    ],
    related: ["43.9", "91.409", "43-appendix-d", "91.405"],
  },
  {
    cite: "43-appendix-a",
    textHash: "db8c459d26400850",
    description:
      "14 CFR Part 43 Appendix A in plain English: what counts as a major alteration or major repair, and the full list of preventive maintenance a pilot may do.",
    answer:
      "Appendix A defines three lists: major alterations, major repairs, and preventive maintenance. The preventive maintenance list in paragraph (c) is the work a pilot may do on an aircraft they own or operate, such as tire changes, spark plugs, oil and fuel filters, batteries and simple fabric patches.",
    points: [
      { text: "Major alterations to airframes, powerplants, propellers and appliances, such as changes to wings, control systems, engine conversions or fuel grade, unless they are already in the aircraft's specifications.", para: "a" },
      { text: "Major repairs, such as repairs to spars, ribs and longerons, stressed skin damage over six inches, crankcase separation and propeller blade repairs.", para: "b" },
      {
        text: "Preventive maintenance includes tires and wheel bearings, shock struts, safety wire, lubrication, simple fabric patches, hydraulic fluid, paint touch-up, upholstery, side windows, seat belts and seats, light bulbs, cowlings, spark plugs, hoses, fuel lines, oil and fuel filters, and batteries.",
        para: "c",
      },
      { text: "Preventive maintenance never involves complex assembly operations.", para: "c" },
      {
        text: "Removing and replacing tray-mounted panel navigation and communication radios is preventive maintenance, except autopilots, transponders and DME, with an operational check before use.",
        para: "c-31",
      },
    ],
    faqs: [
      {
        q: "Can a pilot change the oil?",
        a: "Changing the oil is not one of the numbered items, but cleaning or replacing oil strainers and filter elements is listed at (c)(23), and the FAA has long treated a routine oil change as preventive maintenance. Pilots commonly do them on aircraft they own or operate; if in doubt for your aircraft, ask your mechanic or FSDO.",
      },
      {
        q: "Can a pilot replace a radio?",
        a: "Only a self-contained, tray-mounted nav or comm unit designed for quick removal, under (c)(31). Autopilots, transponders and DME are excluded, and installing a new radio is not on the list.",
      },
      {
        q: "Why does it matter whether a repair is major?",
        a: "Major repairs and alterations need approved data and a Form 337 under 43.9(d), and the owner keeps a copy under 91.417.",
      },
    ],
    related: ["43.3", "43.7", "43.9"],
  },
];
