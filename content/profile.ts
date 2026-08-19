/**
 * Public identity and page copy.
 *
 * Privacy rule for this file: a visitor is here to judge the work. Nothing
 * here states where the owner lives, studies, or spends the rest of the day.
 * No city, no campus, no timezone, no schedule, no study plans.
 */
export const profile = {
  name: "Altair Tolesh",
  /** The hero is built out of this word, so it lives with the identity. */
  wordmark: "ALTAIR",
  initials: "AT",
  role: "Web design and development",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  github:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/nerfalmiralti-max",
  availability: "Available for selected website projects",
} as const;

export const homepageCopy = {
  heroIndex: "Index",
  heroSystem: "Live system",
  /** One line of positioning. Not a biography, not a location. */
  heroStatement: "I design and build websites that go into production.",
  heroBody:
    "Interface, frontend, data, deployment. Three sites are live: one for a paying client, one for a lounge bar, and one hackathon prototype that did not place.",
  /** Only claims a visitor can check by following the site's own links. */
  ledger: [
    { value: "03", label: "sites deployed and reachable" },
    { value: "01", label: "built for a paying client" },
    { value: "03", label: "public repositories" },
  ],
  workEyebrow: "Selected work",
  workHeading: "Three systems",
  workBody:
    "Each one is live, each one has a case study, and each one has its source in the open.",
  noteHeading: "I would rather show finished work than describe intentions.",
  noteBody:
    "A website can look good and still be hard to use. What decides it is duller than the visual design: the mobile layout, the error states, and everything that still has to be true a month after launch.",
  processEyebrow: "Process",
  processHeading: "Six stages, one order",
  processBody:
    "The steps change with the project. The order does not. Each one below carries a real example.",
  contactHeading: "Need a website?",
  contactBody:
    "Send a short description of the project, the pages you need, and any examples you like. I will read it and reply with questions.",
} as const;

export const aboutCopy = {
  eyebrow: "About",
  heading: "I build the whole website, not a slice of it.",
  lede: "Student developer. Interface, frontend, data, and deployment on every project here.",
  opening: [
    "Web development held my attention because the result of every decision shows up on the screen immediately.",
    "At first I worked on appearance. The harder part sits behind the interface: working out what the user actually needs, and then keeping it working once it is deployed and someone else depends on it.",
  ],
  /** A short manifesto, in order. Each beat is drawn from the projects below. */
  manifesto: [
    {
      number: "01",
      word: "Build",
      body: "I take a project end to end — interface, frontend, data, deployment. One person and one system, with no gap in the middle where the work is supposed to be handed over.",
    },
    {
      number: "02",
      word: "Break",
      body: "The version that runs locally is not the version that runs. Mobile layouts, authentication state, environment variables: production is where a project tells you what you actually built.",
    },
    {
      number: "03",
      word: "Ship",
      body: "A site is finished when its owner can run it without me. That means labelled controls, honest error states, and handover notes they can act on.",
    },
    {
      number: "04",
      word: "Repeat",
      body: "Each project so far has corrected something the previous one got wrong. The corrections are specific, and they are written down in the case studies.",
    },
  ],
  projects:
    "99 AKTAU was my first commercial project: booking requests, an admin area, a database, authentication, and a deployment somebody else depends on. Tuesday Lounge Bar was a different problem — no backend, all ordering. Mangystau Trials started at a hackathon and taught me to control the size of an idea.",
  closing:
    "I am still early in this. This portfolio is what I have finished so far, and what I learned while building it.",
} as const;

export const contactCopy = {
  eyebrow: "Contact",
  /** Authored line breaks: the question is a graphic object, not a sentence. */
  questionLines: ["What are", "we building?"],
  body:
    "Share the purpose of the site, the pages you expect, and any examples that explain the direction. I will read the details and reply with questions.",
} as const;

export const privacyCopy = {
  heading: "How this portfolio handles information",
  updated: "Last updated: August 2026",
  sections: [
    {
      title: "Information collected",
      body: "You can browse this portfolio without creating an account. The site does not intentionally collect sensitive personal information and does not use analytics at this time.",
    },
    {
      title: "Contact form",
      body: "The form checks your message in the browser. If a public email address is configured, it opens your email application. Otherwise you can copy the draft. The website does not store the message.",
    },
    {
      title: "Personal details",
      body: "Please do not include private addresses, schedules, phone numbers, family information, or other details that are not needed for a project enquiry.",
    },
    {
      title: "Questions",
      body: "Use the contact page if you have a question about this policy. A public email action appears only when an address is configured.",
    },
  ],
} as const;
