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
  availability:
    "Open to selected website projects, collaborations, and educational opportunities.",
} as const;

export type ProjectSlug =
  | "99-aktau"
  | "tuesday-lounge-bar"
  | "mangystau-trials";

export type ProjectSection = {
  id: string;
  title: string;
  body: string;
};

export type Project = {
  slug: ProjectSlug;
  number: string;
  name: string;
  type: string;
  status: string;
  year: string;
  role: string;
  summary: string;
  challenge: string;
  contribution: string;
  result: string;
  technologies: string[];
  accent: string;
  liveUrl: string;
  repositoryUrl: string;
  caseStudyUrl: string;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "99-aktau",
    number: "01",
    name: "99 AKTAU",
    type: "Commercial full-stack project",
    status: "Live",
    year: "2025",
    role: "Product structure · UI/UX · Full-stack development · Handover",
    summary:
      "A booking website for a PlayStation club in Aktau, built with a customer flow, administrative controls, database integration, and production deployment.",
    challenge:
      "The booking process had to stay simple for guests while giving the administrator enough control to review and manage every request.",
    contribution:
      "I planned the structure, designed the responsive interface, developed the booking flow, connected Supabase, implemented admin authentication and booking statuses, prepared the deployment, and documented the handover process.",
    result:
      "The finished product combines the public website and administration workflow in one maintainable system.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    accent: "#8074ff",
    liveUrl:
      process.env.NEXT_PUBLIC_99_AKTAU_URL ??
      "https://99-aktau.vercel.app/",
    repositoryUrl: process.env.NEXT_PUBLIC_99_AKTAU_GITHUB_URL ?? "",
    caseStudyUrl: "/projects/99-aktau",
    sections: [
      {
        id: "context",
        title: "Business context",
        body: "99 AKTAU needed a reliable booking product, not a decorative landing page. Guests needed a clear way to choose a hall and send a request; staff needed one place to review and update it.",
      },
      {
        id: "challenge",
        title: "The central challenge",
        body: "The customer path had to feel immediate, while the operational side needed authentication, predictable booking states, and enough context for an administrator to make a decision.",
      },
      {
        id: "flow",
        title: "Customer flow",
        body: "A guest selects a hall, enters the booking details, submits a request, and receives a clear status. Each screen asks for one decision and exposes the next useful action.",
      },
      {
        id: "admin",
        title: "Administration",
        body: "Authenticated staff can review requests, see the relevant details, and accept or reject a booking. The public interface and admin workflow use the same underlying status model.",
      },
      {
        id: "implementation",
        title: "Technical implementation",
        body: "Next.js and TypeScript provide the application structure. Supabase handles persisted booking data and authentication. Validation, responsive states, deployment configuration, and handover notes complete the release path.",
      },
      {
        id: "result",
        title: "Result",
        body: "The deployed product gives the club a clear customer journey and a practical operating surface. It also established a repeatable workflow for moving from client requirements to production handover.",
      },
    ],
  },
  {
    slug: "tuesday-lounge-bar",
    number: "02",
    name: "Tuesday Lounge Bar",
    type: "Hospitality website",
    status: "Live",
    year: "2026",
    role: "Information architecture · Interface design · Frontend · Responsive build",
    summary:
      "A hospitality website that presents the venue’s atmosphere while keeping the menu, location, working hours, contact details, and reservation path easy to find.",
    challenge:
      "Hospitality sites often prioritize mood until basic information becomes difficult to access. This project had to keep the visual identity strong without slowing down the visitor’s main tasks.",
    contribution:
      "I organized the content hierarchy, designed the mobile and desktop interface, developed the frontend, refined the venue’s visual presentation, and created direct paths to the menu, contact information, and reservation action.",
    result:
      "The final structure gives the venue a stronger online presentation while keeping the most important visitor actions visible and direct.",
    technologies: ["Next.js", "TypeScript", "Responsive UI", "Vercel"],
    accent: "#d29a62",
    liveUrl:
      process.env.NEXT_PUBLIC_TUESDAY_URL ??
      "https://tuesday-eta-eight.vercel.app/",
    repositoryUrl: process.env.NEXT_PUBLIC_TUESDAY_GITHUB_URL ?? "",
    caseStudyUrl: "/projects/tuesday-lounge-bar",
    sections: [
      {
        id: "context",
        title: "Hospitality context",
        body: "A venue website has two jobs: communicate atmosphere and answer practical questions quickly. Tuesday needed both without turning the experience into a generic restaurant template.",
      },
      {
        id: "visitors",
        title: "Visitor priorities",
        body: "The interface is organized around the questions guests ask first: what the venue feels like, what is available, where it is, when it is open, and how to reserve or make contact.",
      },
      {
        id: "hierarchy",
        title: "Information hierarchy",
        body: "Atmosphere leads the composition, but menu, location, hours, and reservation remain visible actions. Editorial type and warm surfaces create character without reducing legibility.",
      },
      {
        id: "mobile",
        title: "Mobile-first journey",
        body: "On smaller screens, essential venue information moves ahead of secondary storytelling. Touch targets stay large and the reservation path remains available without a long search through the page.",
      },
      {
        id: "implementation",
        title: "Frontend decisions",
        body: "The build uses responsive layout rules, lightweight transitions, semantic content, and restrained visual effects. Large video and interaction-heavy decoration were avoided to protect mobile performance.",
      },
      {
        id: "result",
        title: "Result",
        body: "Tuesday now has a focused digital presentation that supports discovery and decision-making while retaining the warm, evening character of the venue.",
      },
    ],
  },
  {
    slug: "mangystau-trials",
    number: "03",
    name: "Mangystau Trials",
    type: "Tourism product prototype",
    status: "Live prototype",
    year: "2026",
    role: "Product concept · User flow · Route experience · Frontend",
    summary:
      "A route-planning concept that helps travelers organize a trip through Mangystau using their budget, available time, interests, and transport preference.",
    challenge:
      "Travel information about the region is spread across different sources. The product explored how those details could become one understandable route.",
    contribution:
      "I worked on the product concept, user flow, interface structure, route experience, interactive map, and frontend implementation during a limited hackathon timeframe.",
    result:
      "The project did not pass the final hackathon selection. It still became a useful lesson in prioritizing an MVP, working under time pressure, and separating essential functionality from ambitious ideas.",
    technologies: ["Next.js", "React", "TypeScript", "Interactive map", "Vercel"],
    accent: "#65b8bd",
    liveUrl:
      process.env.NEXT_PUBLIC_MANGYSTAU_TRIALS_URL ??
      "https://mangystau-trials.vercel.app/",
    repositoryUrl:
      process.env.NEXT_PUBLIC_MANGYSTAU_TRIALS_GITHUB_URL ?? "",
    caseStudyUrl: "/projects/mangystau-trials",
    sections: [
      {
        id: "context",
        title: "Regional context",
        body: "Mangystau has remarkable destinations, but planning a realistic trip often means collecting route, time, cost, and transport information from disconnected sources.",
      },
      {
        id: "hypothesis",
        title: "Product hypothesis",
        body: "If a traveler can define budget, trip length, interests, and transport, a planning system can turn those constraints into a route that is easier to understand and compare.",
      },
      {
        id: "flow",
        title: "Route experience",
        body: "The flow moves from a short preference setup to a suggested sequence of destinations, then into a map with distance, time, and budget context.",
      },
      {
        id: "scope",
        title: "Hackathon scope",
        body: "The first version tried to cover too much within the available time. The useful correction was to make the core route hypothesis visible before expanding the data and integrations around it.",
      },
      {
        id: "implementation",
        title: "Technical direction",
        body: "The prototype uses a React and Next.js application shell with a map-led interface. Route lines, destination cards, and budget summaries are treated as one coordinated surface.",
      },
      {
        id: "result",
        title: "Honest result",
        body: "The project did not reach the hackathon final. That outcome clarified how to reduce scope, present the main value sooner, and distinguish a persuasive prototype from a dependable released product.",
      },
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Understand",
    body: "Define the business goal, main visitor task, required content, technical limits, and project scope.",
  },
  {
    number: "02",
    title: "Structure",
    body: "Build the sitemap, navigation, content hierarchy, user flows, and mobile behavior.",
  },
  {
    number: "03",
    title: "Design",
    body: "Set the typography, spacing, components, interaction states, and responsive rules.",
  },
  {
    number: "04",
    title: "Build",
    body: "Develop the frontend, connect required services, validate input, and implement the main logic.",
  },
  {
    number: "05",
    title: "Verify",
    body: "Test layouts, forms, error states, accessibility, SEO, and the production build.",
  },
  {
    number: "06",
    title: "Deliver",
    body: "Prepare deployment, environment details, documentation, and the handover path.",
  },
] as const;

export const capabilities = [
  {
    title: "Product structure",
    body: "Site architecture, user flows, feature priorities, content hierarchy, and mobile-first planning.",
  },
  {
    title: "Interface design",
    body: "Typography, spacing systems, responsive layouts, reusable components, interaction states, and motion direction.",
  },
  {
    title: "Development",
    body: "React, Next.js, TypeScript, Tailwind CSS, forms, authentication, Supabase, APIs, and deployment.",
  },
  {
    title: "Release preparation",
    body: "Production builds, environment variables, SEO foundations, analytics setup, documentation, and handover.",
  },
] as const;

export const journey = [
  {
    period: "Early stage",
    category: "Learn",
    title: "Began learning web development",
    story: "Early interface experiments made individual tools understandable by putting them inside small working projects.",
    lesson: "A tool becomes useful when it is connected to a concrete problem.",
  },
  {
    period: "Hackathon",
    category: "Compete",
    title: "Developed Mangystau Trials",
    story: "Built a regional travel-planning prototype under a deadline. It did not reach the final selection.",
    lesson: "A clear MVP matters more than a long list of partially proven features.",
  },
  {
    period: "Commercial work",
    category: "Build",
    title: "Built and delivered 99 AKTAU",
    story: "Connected the public booking path, administration workflow, database, deployment, and handover.",
    lesson: "Shipping includes the quiet work after the interface looks complete.",
  },
  {
    period: "Client-facing work",
    category: "Build",
    title: "Developed Tuesday Lounge Bar",
    story: "Balanced atmosphere with direct access to the information and actions a venue visitor needs.",
    lesson: "Visual direction is strongest when it supports the visitor’s decision.",
  },
  {
    period: "Ongoing",
    category: "Train",
    title: "Continued judo training",
    story: "Training reinforced a practical loop: repeat the fundamentals, review mistakes, adjust, and return.",
    lesson: "Reliable technique is built through consistent correction.",
  },
  {
    period: "Now",
    category: "Learn",
    title: "Strengthening product and engineering judgment",
    story: "Current work focuses on performance, clearer systems, stronger writing, and client-ready execution.",
    lesson: "Progress becomes visible when separate skills begin working as one process.",
  },
  {
    period: "Ahead",
    category: "Future",
    title: "Preparing for larger projects and international study",
    story: "Improving English, engineering fundamentals, and product thinking while preparing for global opportunities.",
    lesson: "A long-term direction is useful when it changes the quality of today’s work.",
  },
] as const;
