export const profile = {
  name: "Altair Tolesh",
  initials: "AT",
  location: "Aktau, Kazakhstan",
  school: "Nazarbayev Intellectual School in Aktau",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  github:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/nerfalmiralti-max",
  availability: "Available for selected website projects",
} as const;

export const homepageCopy = {
  heroLabel: "Web design and development · Aktau, Kazakhstan",
  heroHeading: "I design and build websites for real projects.",
  heroBody:
    "I work on the design, the frontend, the backend connections, and the deployment. Three sites are live: one built for a paying client, one for a lounge bar, one prototype from a hackathon.",
  /** Only claims that can be checked from the linked projects and repositories. */
  heroEvidence: [
    { value: "3", label: "sites deployed and reachable" },
    { value: "1", label: "built for a paying client" },
    { value: "3", label: "public repositories" },
  ],
  noteHeading: "I would rather show finished work than describe intentions.",
  noteBody:
    "A website can look good and still be hard to use. The parts that decide that are mobile layout, navigation, loading speed, forms, error states, and everything that has to be true after deployment.",
  featuredHeading: "The project that taught me the most",
  workHeading: "A hospitality site and a hackathon prototype",
  workBody:
    "One is live and finished. One did not reach the hackathon final, and is listed as the prototype it is.",
  processHeading: "How I work",
  processBody:
    "The steps change with the project. The order does not.",
  aboutHeading: "I started with small websites and kept making the next one harder.",
  aboutParagraphs: [
    "The projects grew into databases, login systems, deployment settings, client requirements, and problems that do not appear in tutorials.",
    "I still have a lot to learn. That is one reason I prefer projects with a clear goal and a finished result.",
  ],
  contactHeading: "Need a website?",
  contactBody:
    "Send a short description of the project, the pages you need, and any examples you like. I will read it and reply with questions.",
} as const;

export const aboutCopy = {
  heading: "I am Altair, a student and developer from Aktau.",
  opening: [
    "I study at Nazarbayev Intellectual School and build websites outside school. Web development held my attention because the result of every decision shows up on the screen immediately.",
    "At first I focused on appearance. The harder part turned out to sit behind the interface: deciding what the user needs, organising the content, handling data, fixing errors, and keeping the project working after deployment.",
  ],
  projects:
    "99 AKTAU was my first commercial project: a website for a PlayStation club with booking requests, an admin area, Supabase, authentication, and deployment. Tuesday Lounge Bar was a different kind of business website. Mangystau Trials started at a hackathon and taught me to control the size of an idea.",
  education:
    "I am also improving my English and preparing for future international study. Stanford is the university I am most interested in, but the immediate goal is simpler: better skills and stronger projects.",
  judo:
    "Outside development I train in judo. It is another place where improvement depends on practice, correction, and patience — a weak part gets easier to fix when I test it again instead of guessing.",
  closing:
    "I am still early in this. This portfolio is what I have finished so far, and what I learned while building it.",
} as const;

export const contactCopy = {
  heading: "Tell me what website you need.",
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
