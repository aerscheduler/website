/**
 * Plain-English summaries: Instructors and students. House rules are in
 * `README.md` beside this file.
 */

/** @type {import("../types").RegSummary[]} */
export default [
  {
    cite: "61.87",
    textHash: "a9162b3f71de690a",
    description:
      "14 CFR 61.87 in plain English: what a student pilot needs before solo, the pre-solo knowledge test and training, and the 90-day solo endorsement.",
    answer:
      "Before a first solo, a student must pass a pre-solo knowledge test given by their instructor, receive and log training in the listed maneuvers, and get a logbook endorsement for the specific make and model. That endorsement is good for 90 days and must be renewed by an instructor every 90 days.",
    points: [
      { text: "Solo means the student is the sole occupant of the aircraft.", para: "a" },
      { text: "The instructor gives a knowledge test on Parts 61 and 91, the local airspace, and the aircraft, and reviews every wrong answer with the student.", para: "b" },
      { text: "The student must be trained, and proficient, in the pre-solo maneuvers for the aircraft.", para: "c" },
      {
        text: "For single-engine airplanes the list includes preflight, taxi, normal and crosswind takeoffs and landings, traffic patterns, slow flight, stalls, emergencies, ground reference maneuvers, simulated engine failures, slips and go-arounds.",
        para: "d",
      },
      { text: "Solo requires an endorsement for the specific make and model from an instructor who gave the training within the preceding 90 days.", para: "n" },
      { text: "Night solo needs night training at that airport and its own endorsement.", para: "o" },
      { text: "The instructor must have trained the student in that make and model, and must update the endorsement every 90 days.", para: "p" },
    ],
    faqs: [
      {
        q: "How long is a solo endorsement good for?",
        a: "90 days. Paragraph (p)(4) keeps it current for solo flight privileges as long as an authorized instructor updates the logbook every 90 days.",
      },
      {
        q: "Can a student solo a different model of airplane?",
        a: "Only with an endorsement for that make and model. The endorsements in (n) and (p) are specific to it.",
      },
    ],
    related: ["61.93", "61.195", "61.189", "61.3"],
  },
  {
    cite: "61.93",
    textHash: "cbbef53e097a3fef",
    description:
      "14 CFR 61.93 in plain English: student solo cross-country requirements, the 25 and 50 nautical mile rules, and the endorsements needed for each flight.",
    answer:
      "A student needs cross-country training and endorsements before any solo flight more than 25 nautical miles from the home airport or landing anywhere else. Each solo cross-country also needs the instructor to review the student's planning and endorse the logbook for that flight.",
    points: [
      { text: "The rules apply to any solo flight more than 25 nm from the departure airport, or landing anywhere but the origin.", para: "a-1" },
      { text: "Solo practice at another airport within 25 nm needs training at that airport, round trip, and an endorsement.", para: "b-1" },
      { text: "Repeated solo flights to one airport within 50 nm need training on the route and one endorsement, not one per flight.", para: "b-2" },
      { text: "A solo cross-country endorsement is needed for the category, and another for the make and model.", para: "c-1" },
      { text: "Each cross-country needs an endorsement after the instructor reviews the student's planning, naming the aircraft and confirming the student is prepared.", para: "c-3" },
      { text: "The instructor must check the planning, the weather for VFR, the student's proficiency and the student's current endorsements.", para: "d" },
    ],
    faqs: [
      {
        q: "Does every solo cross-country need its own endorsement?",
        a: "Yes, under (c)(3), except repeated flights to the same airport within 50 nm under (b)(2).",
      },
      {
        q: "What must a student carry on a solo cross-country?",
        a: "Their logbook and student pilot certificate, under 61.51(i)(2), as well as photo ID and medical under 61.3.",
      },
    ],
    related: ["61.87", "61.109", "61.51", "61.195"],
  },
  {
    cite: "61.109",
    textHash: "01e8419e8a1b192d",
    description:
      "14 CFR 61.109 in plain English: the 40 hours a private pilot airplane applicant needs, including dual, solo, night, cross-country and instrument training.",
    answer:
      "A private pilot certificate with an airplane single-engine rating needs at least 40 hours of flight time, including 20 hours of training with an instructor and 10 hours of solo. The 20 hours must include cross-country, night, instrument and checkride preparation training.",
    points: [
      { text: "At least 40 hours total, with at least 20 hours of instruction and 10 hours of solo.", para: "a" },
      { text: "3 hours of cross-country training.", para: "a-1" },
      { text: "3 hours of night training, including a cross-country of over 100 nm and 10 full-stop takeoffs and landings.", para: "a-2" },
      { text: "3 hours of training by reference to instruments.", para: "a-3" },
      { text: "3 hours of checkride preparation within the 2 calendar months before the test.", para: "a-4" },
      { text: "10 hours of solo: 5 hours of cross-country, one 150 nm cross-country with landings at three points and one leg over 50 nm, and 3 full-stop landings at a towered airport.", para: "a-5" },
      { text: "Up to 2.5 hours in a simulator or flight training device can count, or 5 hours in a Part 142 course.", para: "k-1" },
    ],
    faqs: [
      {
        q: "Do most students finish in 40 hours?",
        a: "40 is the minimum the rule allows, not a typical total. Students commonly need considerably more, and schools quote estimates accordingly.",
      },
      {
        q: "Is it 35 hours at a Part 141 school?",
        a: "The 35-hour minimum for Part 141 private pilot courses is in Part 141's own appendix, not here. This section's (k)(3) gives 35 hours for a Part 142 training center course.",
      },
    ],
    related: ["61.93", "61.87", "61.51", "141.55"],
  },
  {
    cite: "61.189",
    textHash: "f05b011e76f2bf44",
    description:
      "14 CFR 61.189 in plain English: the records a flight instructor must keep of solo endorsements and test endorsements, and for how long.",
    answer:
      "A flight instructor signs the logbook of everyone they train and keeps their own record of every solo endorsement and every knowledge or practical test endorsement they give, including the test results, for at least 3 years.",
    points: [
      { text: "Sign the logbook of each person given flight or ground training.", para: "a" },
      { text: "Record the name of each student endorsed for solo, and the date.", para: "b-1" },
      { text: "Record the name of each person endorsed for a knowledge or practical test, the kind of test, the date and the result.", para: "b-2" },
      { text: "Keep the records at least 3 years.", para: "c" },
    ],
    faqs: [
      {
        q: "Does a school's records system satisfy this?",
        a: "The duty is the instructor's, but the record can be a logbook or a separate document, so a school system that holds the names, dates, test types and results for that instructor serves the purpose. The instructor should be able to produce it for 3 years, including after leaving the school.",
      },
      {
        q: "Why does the pass rate matter?",
        a: "Test results recorded here also feed the instructor's recent experience under 61.197(b)(2)(i), which counts endorsed applicants and their first-attempt pass rate.",
      },
    ],
    related: ["61.195", "61.197", "61.87", "141.101"],
  },
  {
    cite: "61.195",
    textHash: "dea8a41e20a81a6f",
    description:
      "14 CFR 61.195 in plain English: flight instructor limits, the 8 hours in 24 rule, ratings needed to teach, endorsement limits and multiengine experience.",
    answer:
      "A flight instructor may give no more than 8 hours of flight training in any 24 consecutive hours, and may only teach in aircraft for which they hold the matching pilot and instructor ratings. The section also limits which endorsements an instructor may sign and bans self-endorsement.",
    points: [
      { text: "No more than 8 hours of flight training in any 24 consecutive hours.", para: "a" },
      { text: "Teach only in aircraft for which you hold the category and class on both your pilot and instructor certificates.", para: "b" },
      { text: "Instrument training for an instrument rating needs an instrument instructor rating (CFII).", para: "c" },
      { text: "Endorse solo, solo cross-country or Class B solo only after giving the training and finding the student ready; endorse a flight review or IPC only after conducting it.", para: "d" },
      { text: "Training in a multiengine airplane, helicopter or powered-lift needs 5 hours of PIC time in that make and model.", para: "f" },
      { text: "Training must be given in an aircraft with two pilot stations of the category and class sought.", para: "g-2" },
      { text: "Instructors may never endorse themselves.", para: "i" },
    ],
    faqs: [
      {
        q: "Does ground instruction count toward the 8 hours?",
        a: "No. Paragraph (a) limits flight training only.",
      },
      {
        q: "Can a CFI without an instrument instructor rating teach instrument skills?",
        a: "Paragraph (l) lets a CFI with the right category and class teach control of the aircraft by reference to instruments, such as the 3 hours a private pilot needs. Training toward an instrument rating needs the instrument instructor rating under (c).",
      },
    ],
    related: ["61.197", "61.189", "61.87", "61.93"],
  },
  {
    cite: "61.197",
    textHash: "a71cde9be29f5784",
    description:
      "14 CFR 61.197 in plain English: flight instructor certificates no longer expire, and how an instructor keeps recent experience every 24 calendar months.",
    answer:
      "Flight instructor certificates no longer expire. Instead, an instructor may teach only if they have met a recent experience requirement within the preceding 24 calendar months, such as a practical test, an 80 percent first-time pass rate with 5 applicants, or a refresher course.",
    points: [
      { text: "Instructor privileges depend on recent experience within the preceding 24 calendar months.", para: "a" },
      { text: "The 24 months start from issue, from the month the requirement is met, or from the old end date if renewed in its last 3 months.", para: "a" },
      { text: "Passing a practical test for an instructor rating counts.", para: "b-1" },
      { text: "So does endorsing 5 applicants in 24 months with at least 80 percent passing first time.", para: "b-2-i" },
      { text: "Or serving as a check pilot or chief instructor, completing a refresher course in the last 3 months, a military check, or qualifying WINGS activity.", para: "b-2" },
      { text: "Miss it and you may not instruct until privileges are reinstated under 61.199.", para: "c" },
      { text: "Certificates issued before December 1, 2024 can be renewed the same way before their printed expiration.", para: "e" },
    ],
    faqs: [
      {
        q: "Does my CFI certificate still expire?",
        a: "Certificates issued from December 1, 2024 do not carry an expiration date; the instructor needs current recent experience instead. An older certificate shows an expiration date and is renewed under paragraph (e).",
      },
      {
        q: "What date goes in a student's logbook endorsement now?",
        a: "Under 61.51(h)(2)(ii) the instructor writes their certificate expiration date or recent experience end date.",
      },
    ],
    related: ["61.195", "61.189", "61.56"],
  },
];
