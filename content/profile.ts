export const profile = {
  name: "Altair Tolesh",
  initials: "AT",
  location: "Aktau, Kazakhstan",
  coordinates: "43.6411° N, 51.1985° E",
  school: "Nazarbayev Intellectual School in Aktau",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  github:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/nerfalmiralti-max",
  availability: "Available for selected website projects.",
} as const;

export const homepageCopy = {
  heroLabel: "ALTAIR TOLESH · WEB DESIGN AND DEVELOPMENT",
  heroHeading: "I design and build websites for real projects.",
  heroBody:
    "I am a student from Aktau. I work on the design, frontend, backend connections, and deployment of my websites. This portfolio contains commercial work, a hospitality website, and a tourism project built during a hackathon.",
  introductionHeading: "I prefer finished work over impressive promises.",
  introductionBody:
    "A website can look good and still be difficult to use. I pay attention to mobile layouts, navigation, loading speed, forms, error states, and the steps needed to publish the project.",
  workHeading: "Projects I have worked on",
  workBody:
    "The projects below were created for different reasons. One was made for a paying client, one for a lounge bar, and one started as a hackathon idea.",
  aboutHeading: "I started learning by building small websites.",
  aboutParagraphs: [
    "Over time, the projects became more complicated. I had to work with databases, login systems, deployment settings, client requirements, and problems that did not appear in tutorials.",
    "I still have a lot to learn. That is one reason I prefer projects with a clear goal and a finished result.",
  ],
  contactHeading: "Need a website?",
  contactBody:
    "Send me a short description of the project, the pages you need, and any examples you like. I will review it and reply with questions.",
} as const;

export const aboutCopy = {
  heading: "I am Altair, a student and developer from Aktau.",
  opening: [
    "I study at Nazarbayev Intellectual School and build websites outside school. I became interested in web development because I could see the result of every decision directly on the screen.",
    "At first, I focused mainly on appearance. Later, I learned that the harder part is often behind the interface: deciding what the user needs, organizing the content, handling data, fixing errors, and making the project work after deployment.",
  ],
  projects:
    "My first commercial project was 99 AKTAU, a website for a PlayStation club. It included booking requests, an admin area, Supabase, authentication, and deployment. Tuesday Lounge Bar gave me experience with a different type of business website. Mangystau Trials began during a hackathon and taught me to control the size of an idea.",
  education:
    "I am also improving my English and preparing for future international study opportunities. Stanford is currently the university I am most interested in, but my immediate goal is simpler: improve my skills and build stronger projects.",
  judo:
    "Outside development, I train in judo. It gives me another place where improvement depends on practice, correction, and patience.",
  closing:
    "I am still early in this process. This portfolio shows what I have completed so far and what I learned while building it.",
} as const;

export const contactCopy = {
  heading: "Tell me what website you need.",
  body:
    "Share the purpose of the site, the pages you expect, and any examples that help explain the direction. I will read the details and reply with questions.",
} as const;

export const privacyCopy = {
  heading: "How this portfolio handles information",
  updated: "Last updated: August 2026",
  sections: [
    {
      title: "Information collected",
      body: "You can browse this portfolio without creating an account. The site does not intentionally collect sensitive personal information or use analytics at this time.",
    },
    {
      title: "Contact form",
      body: "The form checks your message in the browser. If a public email address is configured, it opens your email application. Otherwise, you can copy the draft. The website does not store the message.",
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
