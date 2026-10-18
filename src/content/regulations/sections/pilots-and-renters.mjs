/**
 * Plain-English summaries: Pilots and renters. House rules are in `README.md`
 * beside this file.
 */

/** @type {import("../types").RegSummary[]} */
export default [
  {
    cite: "61.3",
    textHash: "2a0b195c0673a511",
    description:
      "14 CFR 61.3 in plain English: the pilot certificate, photo ID and medical you must have with you, and who can ask to see them.",
    answer:
      "To act as a required pilot you must have your pilot certificate, a government photo ID and, unless an exception applies, your medical certificate in your possession or readily accessible in the aircraft. You must show them to the FAA, NTSB, TSA or a law enforcement officer who asks.",
    points: [
      { text: "Carry your pilot certificate, or a temporary certificate or authority to fly, on every flight.", para: "a-1" },
      { text: "Carry a photo ID: a driver's license, government ID card, military ID, passport or airport SIDA badge.", para: "a-2" },
      { text: "Carry your medical certificate, unless an exception applies, such as BasicMed, gliders, balloons or sport pilots flying on a driver's license.", para: "c" },
      { text: "Only a flight instructor may give the training required for solo and solo cross-country, endorse applicants, or endorse logbooks.", para: "d-2" },
      { text: "Flying IFR, or in weather below VFR minimums, requires an instrument rating.", para: "e" },
      { text: "Show your certificates and ID on request to the FAA, the NTSB, any law enforcement officer or the TSA.", para: "l" },
    ],
    faqs: [
      {
        q: "Can I show my pilot certificate on my phone?",
        a: "Paragraph (a)(1) requires a certificate issued under 61.19, a temporary certificate, or the document the Airmen Certification Branch issues under 61.29(e). A photo of your plastic certificate is none of those.",
      },
      {
        q: "Do I need my medical with me if I fly under BasicMed?",
        a: "No medical certificate is required under (c)(2)(xiii), but you need a US driver's license and must meet 61.23(c)(3), and 61.113(i) requires your BasicMed paperwork in your logbook.",
      },
    ],
    related: ["61.23", "61.113", "61.51"],
    product: null,
  },
  {
    cite: "61.23",
    textHash: "146e975e6e9e0183",
    description:
      "14 CFR 61.23 in plain English: which medical class you need, how long first, second and third class medicals last under and over age 40, and BasicMed.",
    answer:
      "A private, recreational or student pilot needs at least a third-class medical, or BasicMed. For those privileges any class of medical lasts 60 calendar months if you were under 40 at the exam, and 24 calendar months if you were 40 or older. Commercial privileges need a second-class medical, good for 12 months.",
    points: [
      { text: "First class: ATP pilot-in-command privileges and some Part 121 roles.", para: "a-1" },
      { text: "Second class: commercial pilot privileges, other than in balloons or gliders.", para: "a-2" },
      { text: "Third class: private, recreational and student pilots, and flight instructors acting as pilot in command, unless flying under BasicMed.", para: "a-3" },
      { text: "No medical: gliders, balloons, flight instructors not acting as pilot in command, ground instructors, and checkrides in simulators.", para: "b" },
      {
        text: "BasicMed: hold a US driver's license, have held an FAA medical at any time after July 14, 2006, take the online course every 24 calendar months and see a state-licensed physician every 48 calendar months.",
        para: "c-3",
      },
      {
        text: "Duration for private, student and instructor privileges: 60 calendar months if under 40 at the exam, 24 if 40 or older, whatever the class. For commercial privileges first and second class last 12 months; for ATP privileges a first class lasts 12 months under 40 and 6 months at 40 or older.",
        para: "d",
      },
    ],
    faqs: [
      {
        q: "My second-class medical has lapsed for commercial flying. Can I still fly privately on it?",
        a: "Yes. The table in (d) gives each class a longer life for private privileges: 60 months if you were under 40 at the exam, 24 if 40 or older, counted to the end of the month.",
      },
      {
        q: "When exactly does a medical expire?",
        a: "At the end of the last day of the month: a third-class medical from an exam on March 10, 2026, at age 45 expires at the end of March 31, 2028.",
      },
      {
        q: "Can a flight instructor teach without a medical?",
        a: "Yes, if they are not acting as pilot in command or as a required crewmember (paragraph (b)(7)). If the student cannot act as pilot in command, the instructor must, and then needs a medical or BasicMed.",
      },
    ],
    related: ["61.113", "61.3", "61.56"],
  },
  {
    cite: "91.17",
    textHash: "8ee784fe71c83e9b",
    description:
      "14 CFR 91.17 in plain English: the eight-hour bottle-to-throttle rule, the 0.04 alcohol limit, drugs, and intoxicated passengers.",
    answer:
      "No one may act as a crewmember within 8 hours of drinking alcohol, while under its influence, with an alcohol concentration of 0.04 or more, or while using any drug that impairs them. Pilots also may not carry an intoxicated passenger, except in an emergency or a medical patient under care.",
    points: [
      { text: "Eight hours from the last drink to acting as a crewmember.", para: "a-1" },
      { text: "Never while under the influence, whatever the time since the last drink.", para: "a-2" },
      { text: "No drug that affects your faculties contrary to safety, prescription or not.", para: "a-3" },
      { text: "Alcohol concentration must be below 0.04 grams per deciliter of blood or per 210 liters of breath.", para: "a-4" },
      { text: "Do not carry a passenger who appears intoxicated or under the influence of drugs, except in an emergency or a medical patient under proper care.", para: "b" },
      { text: "Submit to a test when a law enforcement officer asks under state law, and give the FAA results of tests taken within 4 hours of flying when it has reason to ask.", para: "c" },
    ],
    faqs: [
      {
        q: "Is eight hours enough?",
        a: "Only if you are also no longer under the influence and below 0.04. All three limits in paragraph (a) apply, so eight hours is the minimum, not a guarantee.",
      },
      {
        q: "Does it cover cannabis that is legal in my state?",
        a: "Paragraph (a)(3) prohibits any drug that affects your faculties contrary to safety, and FAA medical standards treat marijuana as disqualifying regardless of state law.",
      },
    ],
    related: ["91.3", "61.23"],
    product: null,
  },
  {
    cite: "61.31",
    textHash: "4b7526e4a06fa9cb",
    description:
      "14 CFR 61.31 in plain English: type ratings and the one-time endorsements for complex, high-performance, pressurized and tailwheel airplanes.",
    answer:
      "Some aircraft need more than a pilot certificate. Large and jet aircraft need a type rating, and complex, high-performance (over 200 horsepower), high-altitude pressurized and tailwheel airplanes each need training and a one-time logbook endorsement from an instructor.",
    points: [
      { text: "A type rating is required for large aircraft, turbojet airplanes, powered-lift and other aircraft the FAA designates.", para: "a" },
      { text: "To carry passengers or fly for hire you need the category, class and type rating for the aircraft.", para: "c" },
      { text: "Complex airplane: ground and flight training plus a one-time endorsement, unless you logged complex PIC time before August 4, 1997.", para: "e-1" },
      { text: "High-performance airplane (engine over 200 horsepower): training plus a one-time endorsement, unless you logged such PIC time before August 4, 1997.", para: "f-1" },
      { text: "Pressurized aircraft with a ceiling above 25,000 feet: high-altitude ground training and flight training, each endorsed.", para: "g" },
      { text: "Tailwheel airplane: flight training in takeoffs, landings, wheel landings and go-arounds, plus an endorsement, unless you logged tailwheel PIC time before April 15, 1991.", para: "i-1" },
    ],
    faqs: [
      {
        q: "What makes an airplane complex?",
        a: "The definition is in 61.1: an airplane with retractable landing gear, flaps and a controllable pitch propeller, where a digital engine control such as a FADEC counts in place of the controllable pitch propeller. For a seaplane, flaps and a controllable pitch propeller are enough.",
      },
      {
        q: "Is the high-performance endorsement about horsepower per engine?",
        a: "Paragraph (f) defines a high-performance airplane as one with an engine of more than 200 horsepower, so it is per engine, not combined.",
      },
      {
        q: "Does a renter checkout satisfy 61.31?",
        a: "A school's checkout is its own insurance or rental requirement. The 61.31 endorsement is a one-time logbook entry for the class of airplane, and a checkout in a complex airplane is often where students get it.",
      },
    ],
    related: ["61.51", "61.57", "61.195"],
  },
  {
    cite: "61.51",
    textHash: "417e4bbe9cde9bba",
    description:
      "14 CFR 61.51 in plain English: what a pilot must log, what every logbook entry needs, and when you may log PIC, solo, instrument and training time.",
    answer:
      "You must log the training and experience you use for a certificate, rating, flight review or currency. Each entry needs the date, time, where you departed and arrived, the aircraft, the kind of time (solo, PIC, dual) and the conditions (day, night, instrument).",
    points: [
      { text: "Log the time you use for a certificate, rating, flight review or recent experience.", para: "a" },
      { text: "Each entry: date, total time, departure and arrival points, aircraft type and identification, and the safety pilot's name if one was required.", para: "b-1" },
      { text: "Solo time is only time you are the sole occupant.", para: "d" },
      {
        text: "Log PIC time when you are the sole manipulator of the controls of an aircraft you are rated for, the sole occupant, or the instructor giving instruction. A student logs PIC only when solo with a current endorsement.",
        para: "e",
      },
      { text: "Log instrument time only when flying solely by reference to instruments, and record each approach's location and type for currency.", para: "g" },
      { text: "Training time is endorsed by the instructor with signature, certificate number and expiration or recent experience end date.", para: "h-2" },
      { text: "A student pilot carries the logbook and student certificate on every solo cross-country.", para: "i-2" },
    ],
    faqs: [
      {
        q: "Can a safety pilot log PIC time?",
        a: "Often, yes. When the other pilot is under the hood, the safety pilot is a required crewmember under 91.109, so they can log PIC if they act as pilot in command, or SIC under (f)(2) in some cases.",
      },
      {
        q: "Does my logbook have to be paper?",
        a: "Paragraph (a) asks for a manner acceptable to the Administrator, and electronic logbooks are widely accepted.",
      },
    ],
    related: ["61.57", "61.56", "61.189"],
    product: null,
  },
  {
    cite: "61.56",
    textHash: "a819694d680cb983",
    description:
      "14 CFR 61.56 in plain English: the flight review (BFR) every 24 calendar months, one hour of ground and one of flight, and what counts instead.",
    answer:
      "To act as pilot in command you need a flight review within the past 24 calendar months: at least 1 hour of ground training and 1 hour of flight training with an instructor, ending in a logbook endorsement. Passing a checkride or completing a phase of the FAA WINGS program counts instead.",
    points: [
      { text: "At least 1 hour of flight training and 1 hour of ground training, covering the Part 91 rules and the maneuvers the instructor chooses.", para: "a" },
      { text: "It must be done since the beginning of the 24th calendar month before the month you fly as pilot in command.", para: "c" },
      { text: "A checkride or proficiency check for a certificate, rating or operating privilege resets it.", para: "d" },
      { text: "Completing a phase of an FAA pilot proficiency program (WINGS) counts as a flight review.", para: "e" },
      { text: "Flight instructors who met their recent experience requirements skip the hour of ground training.", para: "f" },
      { text: "A student pilot with a current solo endorsement does not need one.", para: "g" },
    ],
    faqs: [
      {
        q: "My flight review was in May 2024. When does it run out?",
        a: "At the end of May 2026. Counting from the beginning of the 24th calendar month before the flight means it lasts to the end of the month two years on.",
      },
      {
        q: "Can I fail a flight review?",
        a: "There is no pass or fail; the instructor either endorses the logbook or does not, and keeps training until they can.",
      },
      {
        q: "Is a flight review a BFR?",
        a: "Yes. BFR, for biennial flight review, is the older name pilots still use.",
      },
    ],
    related: ["61.57", "61.195", "61.51"],
  },
  {
    cite: "61.57",
    textHash: "901a391f855e595f",
    description:
      "14 CFR 61.57 in plain English: passenger currency (3 takeoffs and landings in 90 days), night currency, and instrument currency in 6 calendar months.",
    answer:
      "To carry passengers you need 3 takeoffs and 3 landings in the preceding 90 days in the same category, class and type, to a full stop if it is a tailwheel airplane. At night you need 3 to a full stop at night. To fly IFR you need 6 approaches, holding and course tracking within the preceding 6 calendar months.",
    points: [
      { text: "Passengers: 3 takeoffs and 3 landings in 90 days as sole manipulator in the same category, class and type; tailwheel landings to a full stop.", para: "a-1" },
      { text: "Passengers at night: 3 takeoffs and 3 landings to a full stop between 1 hour after sunset and 1 hour before sunrise, within 90 days.", para: "b-1" },
      { text: "IFR: 6 instrument approaches, holding, and intercepting and tracking courses within the 6 calendar months before the month of the flight.", para: "c-1" },
      { text: "Instrument currency can be kept in a simulator, flight training device or aviation training device.", para: "c-2" },
      { text: "More than 6 calendar months out of instrument currency requires an instrument proficiency check.", para: "d-1" },
      { text: "You may fly with an instructor to regain currency without being current.", para: "e-5" },
    ],
    faqs: [
      {
        q: "Can I regain passenger currency with passengers on board?",
        a: "No. Fly the three takeoffs and landings solo, or with only the people necessary for the flight, under (a)(2), or with an instructor under (e)(5).",
      },
      {
        q: "I let my instrument currency lapse four months ago. Do I need an IPC?",
        a: "Not yet. Within the next 6 calendar months you can log the approaches, holding and tracking with a safety pilot in VFR conditions. After that, (d) requires an instrument proficiency check.",
      },
      {
        q: "Does a touch-and-go count for night currency?",
        a: "No. Paragraph (b) requires landings to a full stop.",
      },
    ],
    related: ["61.56", "61.51", "61.31"],
    product: null,
  },
  {
    cite: "61.113",
    textHash: "7ed57418aa8570b9",
    description:
      "14 CFR 61.113 in plain English: what a private pilot can and cannot be paid for, sharing flight costs pro rata, and the BasicMed aircraft limits.",
    answer:
      "A private pilot may not fly for compensation or hire, but may share a flight's fuel, oil, airport expenses and rental fees with passengers, paying at least their own pro rata share. A few narrow exceptions apply, and the section also sets the limits for flying under BasicMed.",
    points: [
      { text: "No acting as pilot in command for compensation or hire, or carrying passengers or property for hire.", para: "a" },
      { text: "Flying incidental to your business or job is allowed if no passengers or property are carried for hire.", para: "b" },
      { text: "You may share costs, but must pay at least your pro rata share, and only fuel, oil, airport expenditures and rental fees count.", para: "c" },
      { text: "Charitable and community event flights under 91.146, search and location reimbursement, and aircraft sales demos with 200 hours are allowed.", para: "d" },
      {
        text: "Under BasicMed: aircraft authorized for no more than 7 occupants and 12,500 pounds maximum takeoff weight, no more than 6 passengers, below 18,000 feet MSL, at or below 250 knots, and within the US unless another country allows it.",
        para: "i",
      },
      { text: "Under BasicMed, keep the completed medical examination checklist and course certificate in your logbook.", para: "i-3" },
    ],
    faqs: [
      {
        q: "Can three friends and I split the rental four ways?",
        a: "Yes, if you pay at least your quarter and the costs are fuel, oil, airport expenditures or rental fees. Paragraph (c) only allows sharing; it does not allow the passengers to pay your share.",
      },
      {
        q: "Does logging time count as compensation?",
        a: "The FAA has treated flight time itself as compensation in its legal interpretations, which is why a private pilot cannot take a free flight in return for flying someone somewhere. Ask before relying on a common-purpose arrangement.",
      },
      {
        q: "What are the BasicMed limits now?",
        a: "As the section currently reads: an aircraft authorized for no more than 7 occupants with a maximum takeoff weight of no more than 12,500 pounds, no more than 6 passengers, not above 18,000 feet MSL, not above 250 knots indicated, and not outside the US unless authorized. Check the official text below for the current version.",
      },
    ],
    related: ["61.23", "61.3", "91.147"],
    product: {
      text: "AerScheduler splits one booking between everyone on it, with an invoice or ledger charge for each person.",
      href: "/features/billing",
    },
    links: [{ href: "/resources/split-billing-shared-flights", label: "Split billing and shared flights" }],
  },
  {
    cite: "91.3",
    textHash: "dfe705a43790ee90",
    description:
      "14 CFR 91.3 in plain English: the pilot in command is responsible for and the final authority on the flight, and may deviate from the rules in an emergency.",
    answer:
      "The pilot in command is directly responsible for, and is the final authority as to, the operation of the aircraft. In an in-flight emergency that needs immediate action, the pilot may deviate from any Part 91 rule as far as the emergency requires.",
    points: [
      { text: "The pilot in command is responsible for, and the final authority on, the flight.", para: "a" },
      { text: "In an in-flight emergency requiring immediate action, you may deviate from Part 91 as much as needed.", para: "b" },
      { text: "If the FAA asks, send a written report of the deviation.", para: "c" },
    ],
    faqs: [
      {
        q: "Does declaring an emergency mean an automatic violation?",
        a: "No. Paragraph (b) authorizes the deviation the emergency requires. The FAA may ask for a written report under (c).",
      },
    ],
    related: ["91.7", "91.103"],
    product: null,
  },
  {
    cite: "91.103",
    textHash: "ff35e84a324f35d4",
    description:
      "14 CFR 91.103 in plain English: what a pilot must know before every flight, including weather, fuel, alternatives, runway lengths and performance.",
    answer:
      "Before every flight the pilot in command must become familiar with all available information about it. That always includes runway lengths and takeoff and landing distances. For IFR flights and flights away from the airport it also includes weather, fuel, alternatives and known ATC delays.",
    points: [
      { text: "Become familiar with all available information concerning the flight.", para: "" },
      { text: "For IFR or a flight not in the vicinity of an airport: weather reports and forecasts, fuel requirements, alternatives, and known traffic delays.", para: "a" },
      { text: "For every flight: runway lengths at the airports you plan to use, and takeoff and landing distance data from the flight manual or other reliable information.", para: "b" },
    ],
    faqs: [
      {
        q: "What does NWKRAFT mean?",
        a: "A memory aid for this section: NOTAMs, Weather, Known ATC delays, Runway lengths, Alternatives, Fuel requirements, Takeoff and landing distances.",
      },
      {
        q: "Do I need a weather briefing for a local pattern flight?",
        a: "Paragraph (a)'s weather requirement applies to IFR and to flights not in the vicinity of an airport. You still have to be familiar with all available information, and checking the weather is part of that.",
      },
    ],
    related: ["91.151", "91.3", "91.7"],
    product: null,
  },
  {
    cite: "91.151",
    textHash: "4d270db0d07c5d96",
    description:
      "14 CFR 91.151 in plain English: VFR fuel reserves, 30 minutes by day and 45 minutes at night for airplanes, 20 minutes for helicopters.",
    answer:
      "Before a VFR flight, an airplane must carry enough fuel to reach the first intended landing point and then fly at normal cruise for 30 more minutes by day, or 45 minutes at night. A rotorcraft needs 20 minutes.",
    points: [
      { text: "Count wind and forecast weather to the first point of intended landing.", para: "a" },
      { text: "Airplanes by day: 30 minutes more at normal cruising speed.", para: "a-1" },
      { text: "Airplanes at night: 45 minutes more.", para: "a-2" },
      { text: "Rotorcraft: 20 minutes more.", para: "b" },
    ],
    faqs: [
      {
        q: "Does the reserve apply at the destination or the first stop?",
        a: "To the first point of intended landing, so a planned fuel stop is the point the reserve is measured to.",
      },
      {
        q: "Is 30 minutes enough?",
        a: "It is the legal minimum when the flight begins. Many schools and renters set a personal or company minimum of an hour.",
      },
    ],
    related: ["91.103", "91.3"],
    product: null,
  },
];
