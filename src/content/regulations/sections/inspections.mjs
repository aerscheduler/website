/**
 * Plain-English summaries: Required inspections. House rules are in
 * `README.md` beside this file.
 */

/** @type {import("../types").RegSummary[]} */
export default [
  {
    cite: "91.409",
    textHash: "889adc7b64967080",
    description:
      "14 CFR 91.409 in plain English: every aircraft needs an annual within 12 calendar months, and aircraft used for hire or instruction also need a 100-hour.",
    answer:
      "Every aircraft needs an annual inspection within the preceding 12 calendar months. An aircraft that carries passengers for hire, or that an instructor provides for flight instruction for hire, also needs an annual or 100-hour inspection every 100 hours of time in service.",
    points: [
      { text: "The annual is due within the preceding 12 calendar months, so it runs to the end of the month a year later, not to the day.", para: "a" },
      { text: "The annual is done under Part 43 and approved for return to service by a person 43.7 authorizes, in practice a mechanic with Inspection Authorization.", para: "a-1" },
      { text: "A 100-hour counts as an annual only if an IA performs it and logs it as an annual.", para: "a" },
      {
        text: "The 100-hour applies when carrying anyone other than crew for hire, or when giving flight instruction for hire in an aircraft the instructor provides. An annual also resets it.",
        para: "b",
      },
      { text: "You may run up to 10 hours past 100 only to reach a place where the inspection can be done, and those hours come off the next interval.", para: "b" },
      { text: "Experimental, light-sport, special flight permit and provisional aircraft are exempt, as are aircraft on a progressive or approved program.", para: "c" },
      { text: "A progressive inspection program, run under an IA, repair station or manufacturer, can replace the annual and 100-hour if the FSDO accepts it.", para: "d" },
      { text: "Large airplanes, multiengine turbine airplanes and turbine rotorcraft follow an inspection program chosen under (f) instead.", para: "e" },
    ],
    faqs: [
      {
        q: "If my annual was signed on March 3, when is the next one due?",
        a: "By the end of March the following year. The rule counts 12 calendar months, so the due date is the last day of the month, not the anniversary.",
      },
      {
        q: "Does renting an aircraft to a student pilot trigger the 100-hour?",
        a: "The rule names two cases: carrying anyone other than crew for hire, and an instructor giving flight instruction for hire in an aircraft that instructor provides. A flight school renting its aircraft for instruction is the common case that needs it. A pure solo rental with no instruction is a question worth putting to your FSDO, and many schools simply do the 100-hour on every rental aircraft.",
      },
      {
        q: "Can I fly 105 hours between 100-hour inspections?",
        a: "Only to get the aircraft to a place where the inspection can be done, and the extra 5 hours come off the next 100. You cannot use the 10 hours for ordinary flying.",
      },
      {
        q: "Does an annual reset the 100-hour clock?",
        a: "Yes. Paragraph (b) accepts an annual or a 100-hour inspection within the preceding 100 hours.",
      },
    ],
    related: ["43-appendix-d", "43.11", "91.417", "91.403"],
    links: [{ href: "/resources/calendar-months-and-inspection-due-dates", label: "Calendar months and inspection due dates" }],
  },
  {
    cite: "91.411",
    textHash: "b65630e92c523ec6",
    description:
      "14 CFR 91.411 in plain English: to fly IFR in controlled airspace, the static system, altimeters and altitude reporting must be tested every 24 calendar months.",
    answer:
      "To fly IFR in controlled airspace, an airplane or helicopter's static system, altimeters and altitude reporting equipment must have been tested within the preceding 24 calendar months. The test is also required after the static system is opened or the encoder is worked on.",
    points: [
      { text: "Every 24 calendar months, the static system, each altimeter and the automatic altitude reporting must pass the tests in Part 43 Appendices E and F.", para: "a-1" },
      { text: "Opening and closing the static system, other than using the drain or alternate static valve, requires a new static test.", para: "a-2" },
      { text: "Work on the transponder's altitude reporting that could introduce a correspondence error requires a new integrated test.", para: "a-3" },
      {
        text: "The test is done by the aircraft manufacturer, a suitably rated repair station, or, for the static system test only, a mechanic with an airframe rating.",
        para: "b",
      },
      { text: "You may not fly IFR above the highest altitude the altimeters and encoder were tested to.", para: "d" },
    ],
    faqs: [
      {
        q: "Do I need the pitot-static check to fly VFR?",
        a: "Not under this section, which applies to IFR in controlled airspace. The transponder check in 91.413 applies whenever the transponder is required, VFR included.",
      },
      {
        q: "Can my A&P do the altimeter test?",
        a: "A mechanic with an airframe rating may do the static pressure system test only. The altimeter and altitude reporting tests need the manufacturer or an appropriately rated repair station.",
      },
    ],
    related: ["91.413", "91.171", "91.409"],
  },
  {
    cite: "91.413",
    textHash: "5205e70b522ab30f",
    description:
      "14 CFR 91.413 in plain English: a required ATC transponder must be tested and inspected every 24 calendar months, and after any work that could affect it.",
    answer:
      "Any transponder required by 91.215 must have been tested and inspected within the preceding 24 calendar months. It also needs a new test after installation or maintenance that could introduce a data correspondence error.",
    points: [
      { text: "A transponder required under 91.215 must pass the Part 43 Appendix F test every 24 calendar months.", para: "a" },
      { text: "Installing or working on the transponder in a way that could create a correspondence error needs the Appendix E integrated test.", para: "b" },
      { text: "The test is done by a suitably rated repair station, an air carrier's continuous airworthiness program, or the aircraft manufacturer if it installed the transponder.", para: "c" },
    ],
    faqs: [
      {
        q: "Is the transponder check the same as the pitot-static check?",
        a: "They are different checks on the same 24-calendar-month cycle, which is why shops usually do them together. The transponder check applies whenever the transponder is required, including VFR flight; the pitot-static check in 91.411 applies to IFR.",
      },
      {
        q: "Can an A&P sign off the transponder check?",
        a: "No. Paragraph (c) lists repair stations with the right radio rating, certain air carrier programs and the manufacturer. A mechanic's certificate alone is not on the list.",
      },
    ],
    related: ["91.411", "91.225", "91.409"],
  },
  {
    cite: "91.207",
    textHash: "7a215816cb0c20e0",
    description:
      "14 CFR 91.207 in plain English: when an airplane needs an ELT, the 12-month ELT inspection, battery replacement rules, and the 50 nm training exception.",
    answer:
      "Most US-registered airplanes must carry a working emergency locator transmitter, inspected every 12 calendar months. Its battery must be replaced after 1 cumulative hour of use or when half its useful life has passed.",
    points: [
      { text: "Most airplanes must carry an approved, operable ELT; charter and air carrier operations need the automatic type.", para: "a" },
      { text: "Mount it to minimize crash damage, and fixed or deployable automatic units as far aft as practicable.", para: "b" },
      { text: "Replace or recharge the battery after 1 cumulative hour of use or at 50 percent of its useful life, and mark the new date on the ELT and in the records.", para: "c" },
      { text: "Inspect it every 12 calendar months for installation, battery corrosion, controls and crash sensor, and signal strength.", para: "d" },
      { text: "You may ferry a newly bought airplane to have an ELT installed, or a broken one to be repaired, with only required crew aboard.", para: "e" },
      {
        text: "Exempt: training flights entirely within 50 nautical miles of the departure airport, single-seat aircraft, and several other listed operations.",
        para: "f",
      },
      { text: "An ELT removed for service may be out for up to 90 days with a records entry and an \"ELT not installed\" placard.", para: "f-10" },
    ],
    faqs: [
      {
        q: "Do flight school airplanes need an ELT?",
        a: "Paragraph (f)(3) exempts aircraft while engaged in training operations conducted entirely within 50 nautical miles of the airport where the local flight began. Once a flight goes beyond that, such as a cross-country, the exemption no longer covers it.",
      },
      {
        q: "Is the ELT inspection part of the annual?",
        a: "It is a separate requirement on its own 12-calendar-month clock. Many shops do it during the annual, but it is tracked and logged on its own.",
      },
    ],
    related: ["91.205", "91.409", "91.417"],
  },
  {
    cite: "91.171",
    textHash: "94666586ebb681c7",
    description:
      "14 CFR 91.171 in plain English: to use VOR under IFR, the equipment must have been checked within 30 days, with the allowed error and how to log the check.",
    answer:
      "To navigate by VOR under IFR, the aircraft's VOR equipment must have been operationally checked within the preceding 30 days and found within tolerance, unless it is maintained under an approved procedure. The pilot logs the date, place, bearing error and signature.",
    points: [
      { text: "The VOR check is good for 30 days, unless the equipment is maintained under an approved procedure.", para: "a" },
      { text: "A VOT test signal or a designated ground checkpoint allows plus or minus 4 degrees.", para: "b-1" },
      { text: "A designated airborne checkpoint allows plus or minus 6 degrees.", para: "b-3" },
      { text: "With no signal or checkpoint, an airborne check over a ground point on an airway radial, preferably more than 20 nautical miles out, allows 6 degrees.", para: "b-4" },
      { text: "Two independent receivers may be checked against each other, within 4 degrees of each other.", para: "c" },
      { text: "Log the date, place, bearing error and your signature in the aircraft log or another record.", para: "d" },
    ],
    faqs: [
      {
        q: "Where do I log a VOR check?",
        a: "Paragraph (d) says the aircraft log or other record. Many aircraft carry a VOR check sheet in the logbook pocket for exactly this.",
      },
      {
        q: "Do I need a VOR check to fly IFR with GPS only?",
        a: "The section applies when operating under IFR using the VOR system. If no part of the flight relies on VOR, it does not come into play, but most IFR aircraft keep it current so VOR stays available.",
      },
    ],
    related: ["91.411", "91.205"],
    product: { text: "AerScheduler can track the 30-day VOR check as a recurring item on each aircraft alongside its other inspections.", href: "/features/inspections" },
  },
  {
    cite: "91.225",
    textHash: "39c0c87e31719e7c",
    description:
      "14 CFR 91.225 in plain English: where ADS-B Out is required (Class A, B, C, the Mode C veil, above 10,000 feet MSL) and the exceptions.",
    answer:
      "Since January 1, 2020, aircraft need ADS-B Out to fly in Class A, B and C airspace, within the 30 nm Mode C veil, above Class B and C shelves, and in Class E at or above 10,000 feet MSL. Aircraft certificated without an engine-driven electrical system, such as gliders and many antiques, are partly exempt.",
    points: [
      { text: "Class A airspace requires 1090 MHz ADS-B Out meeting TSO-C166b or C166c.", para: "a" },
      { text: "Below 18,000 feet MSL in the airspace listed in (d), either 1090 MHz or 978 MHz UAT equipment is acceptable.", para: "b" },
      {
        text: "ADS-B is required in Class B and C, within 30 nm of the listed Class B airports up to 10,000 feet MSL, above Class B and C ceilings to 10,000 feet, and in Class E at or above 10,000 feet MSL except at or below 2,500 feet AGL.",
        para: "d",
      },
      { text: "Aircraft never certificated with an engine-driven electrical system may fly in the 10,000-foot Class E and inside the Mode C veil if they stay outside and below Class B and C.", para: "e" },
      { text: "Equipped aircraft must transmit at all times unless the FAA or ATC directs otherwise.", para: "f" },
      { text: "ATC can authorize a flight with inoperative ADS-B at any time, or without ADS-B with at least 1 hour's notice.", para: "g" },
    ],
    faqs: [
      {
        q: "Do I need ADS-B to fly in Class D airspace?",
        a: "Not because it is Class D. But many Class D airports sit inside a Mode C veil or under a Class B or C shelf, where (d) does require it.",
      },
      {
        q: "Can I turn ADS-B off?",
        a: "No. Paragraph (f) requires equipped aircraft to transmit at all times unless the FAA authorizes otherwise for a sensitive government mission or ATC directs it.",
      },
    ],
    related: ["91.413", "91.205"],
    product: null,
  },
  {
    cite: "43-appendix-d",
    textHash: "caaf76a863020d60",
    description:
      "14 CFR Part 43 Appendix D in plain English: the minimum scope of an annual or 100-hour inspection, group by group, from fuselage to radios.",
    answer:
      "Appendix D lists the minimum an annual or 100-hour inspection must cover. The inspector opens and cleans the aircraft, then checks each group, from fuselage, cabin, engine and landing gear to wings, tail, propeller and radios, for the defects the appendix names.",
    points: [
      { text: "Before inspecting, open all necessary inspection plates, access doors, fairings and cowling, and clean the aircraft and engine.", para: "a" },
      { text: "Fuselage and hull: skin and fabric, systems and components.", para: "b" },
      { text: "Cabin and cockpit: loose equipment, seats and belts, windows, instruments, controls, batteries and all systems.", para: "c" },
      { text: "Engine and nacelle: leaks, studs and nuts, compression and metal in screens, mounts, controls, hoses, exhaust, accessories and cowling.", para: "d" },
      { text: "Landing gear: struts, linkages, retraction, hydraulic lines, wiring, wheels, tires, brakes, floats and skis.", para: "e" },
      { text: "Wings, center section and the complete empennage.", para: "f" },
      { text: "Propeller: blades, bolts, anti-ice and controls.", para: "h" },
      { text: "Radios: installation, wiring, bonding and shielding, antennas. Then anything installed that is not listed.", para: "i" },
    ],
    faqs: [
      {
        q: "Is the annual more thorough than the 100-hour?",
        a: "The scope in Appendix D is the same for both. The difference is who may sign: an annual needs a mechanic with Inspection Authorization, while a 100-hour can be signed by a mechanic with airframe and powerplant ratings.",
      },
      {
        q: "Does the manufacturer's checklist replace Appendix D?",
        a: "Appendix D is the minimum. Manufacturers' inspection checklists usually go further, and mechanics generally follow the manufacturer's list as long as it covers everything in Appendix D.",
      },
    ],
    related: ["91.409", "43.11", "43.7"],
  },
];
