export type ProjectSlug =
  | "99-aktau"
  | "tuesday-lounge-bar"
  | "mangystau-trials";

/**
 * `featured` gets the full-width treatment on the homepage and `/work`.
 * `selected` is shipped work shown at normal weight.
 * `prototype` is honest about being unfinished, and ranks last.
 */
export type ProjectTier = "featured" | "selected" | "prototype";

export type EvidenceKind =
  | "live"
  | "client"
  | "repository"
  | "database"
  | "auth"
  | "responsive"
  | "languages"
  | "prototype";

export type Evidence = {
  kind: EvidenceKind;
  label: string;
};

/** One row of the architecture diagram. Only layers the project actually has. */
export type ArchitectureLayer = {
  layer: string;
  detail: string;
  parts: string[];
};

export type Decision = {
  question: string;
  choice: string;
  reason: string;
};

/**
 * An abstract diagram of how a project is put together. Nodes and edges come
 * from what the project actually does. There are no product screenshots on
 * this site, and nothing here invents a record, a price, or a metric.
 *
 * Coordinates live in a 120 x 100 space so the renderer can draw straight
 * edges at true angles. Slots are positional: node 0 of one project becomes
 * node 0 of the next, which is what makes switching read as one system
 * rearranging rather than three diagrams swapping places.
 */
export type SystemNodeKind = "input" | "core" | "gate" | "output";

export type SystemNode = {
  label: string;
  x: number;
  y: number;
  kind: SystemNodeKind;
};

export type SystemEdge = {
  from: number;
  to: number;
  /** `return` edges draw dashed: information coming back, not moving on. */
  kind?: "primary" | "return";
};

export type ProjectSystem = {
  caption: string;
  outcomeLabel: string;
  outcome: string;
  /** Read out to assistive technology in place of the drawing. */
  alt: string;
  /** The same system in words, for small screens and for no-JS. */
  steps: string[];
  nodes: SystemNode[];
  edges: SystemEdge[];
};

export type ProjectSection = {
  id: string;
  title: string;
  body: string;
};

export type Project = {
  slug: ProjectSlug;
  number: string;
  tier: ProjectTier;
  name: string;
  type: string;
  status: string;
  year: string;
  /** One sentence. What it is. */
  tagline: string;
  /** What a visitor can actually do, in plain language. */
  summary: string;
  problem: string;
  role: string[];
  stack: string[];
  evidence: Evidence[];
  /** How the name is set in the index and on the case study cover. */
  indexName: string;
  wordmarkLines: string[];
  system: ProjectSystem;
  architecture: ArchitectureLayer[];
  decisions: Decision[];
  result: string;
  learned: string;
  accent: string;
  liveUrl: string;
  repositoryUrl: string;
  caseStudyUrl: string;
  liveLabel: string;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "99-aktau",
    number: "01",
    tier: "featured",
    name: "99 AKTAU",
    type: "Commercial website",
    status: "Completed",
    year: "2025",
    tagline:
      "A website for a PlayStation club, with guest booking requests and an admin area to manage them.",
    summary:
      "A guest picks a hall and sends a booking request. The administrator opens it and accepts, rejects, or deletes it. The guest sees the updated status. The public site and the admin tools read the same booking data.",
    problem:
      "The club needed a public website and a practical admin area, not two separate tools holding different booking information.",
    role: [
      "Interface design",
      "Responsive frontend",
      "Supabase integration",
      "Admin authentication",
      "Booking statuses",
      "Deployment setup",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    evidence: [
      { kind: "client", label: "Built for a paying client" },
      { kind: "live", label: "Live in production" },
      { kind: "repository", label: "Source on GitHub" },
      { kind: "database", label: "Supabase database" },
      { kind: "auth", label: "Admin authentication" },
    ],
    indexName: "99 AKTAU",
    wordmarkLines: ["99", "AKTAU"],
    system: {
      caption: "Booking flow",
      outcomeLabel: "Result",
      outcome: "One record, two views",
      alt: "System diagram of the 99 AKTAU booking flow. A guest sends a request, the request becomes a stored record with a status, an authenticated administrator reads that record and writes a decision back to it, and the guest sees the resulting status. Both sides read the same record.",
      steps: [
        "Guest chooses a hall and sends a request",
        "The request is stored with a status",
        "An authenticated administrator reviews it",
        "Accept, reject, or delete writes back",
        "The guest sees the status that was set",
      ],
      nodes: [
        { label: "Guest", x: 0, y: 14, kind: "input" },
        { label: "Request", x: 40, y: 14, kind: "core" },
        { label: "Record", x: 66, y: 56, kind: "core" },
        { label: "Admin", x: 120, y: 14, kind: "gate" },
        { label: "Status", x: 66, y: 100, kind: "output" },
      ],
      edges: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 2, kind: "return" },
        { from: 2, to: 4 },
      ],
    },
    architecture: [
      {
        layer: "Frontend",
        detail: "Public site and admin area in one Next.js application",
        parts: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        layer: "Data",
        detail: "Booking requests stored with a status field",
        parts: ["Supabase"],
      },
      {
        layer: "Access",
        detail: "Admin routes behind authentication",
        parts: ["Supabase Auth"],
      },
      {
        layer: "Delivery",
        detail: "Production build with environment variables",
        parts: ["Vercel"],
      },
    ],
    decisions: [
      {
        question: "How much should the guest form ask for?",
        choice:
          "Keep the guest form short, ordered by what the guest already knows.",
        reason:
          "The administrator still needed enough to accept, reject, or remove a request without contacting the guest first. The form had to stop exactly at that line.",
      },
      {
        question: "Where does booking state live?",
        choice: "In a stored status on the request, not in browser state.",
        reason:
          "The guest and the administrator look at the same request from two different places. A status the server owns is what lets both sides agree on it.",
      },
      {
        question: "How do admin actions avoid mistakes?",
        choice: "Distinct labels for accept, reject, and delete.",
        reason:
          "The three actions have very different consequences. Similar wording is what makes them easy to confuse.",
      },
      {
        question: "One service or several?",
        choice: "Supabase for both storage and authentication.",
        reason:
          "It kept the number of moving parts and environment variables low on a project I had to deploy and hand over on my own.",
      },
    ],
    result:
      "The public website and the admin tools work as one system. Guests send requests, and the club manages each one from the admin area.",
    learned:
      "A commercial website is not finished when the public pages look correct. The owner also needs reliable controls, deployment settings, and clear handover notes.",
    accent: "#8a7dff",
    liveUrl:
      process.env.NEXT_PUBLIC_99_AKTAU_URL ?? "https://99-aktau.vercel.app/",
    repositoryUrl:
      process.env.NEXT_PUBLIC_99_AKTAU_GITHUB_URL ??
      "https://github.com/nerfalmiralti-max/99-Aktau",
    caseStudyUrl: "/work/99-aktau",
    liveLabel: "Visit website",
    sections: [
      {
        id: "context",
        title: "Context",
        body: "This was my first commercial project. The club had no website and no way to take a booking other than a direct message. Both sides of the problem, the guest sending a request and the club answering it, had to be solved together or the site would only move the work somewhere else.",
      },
      {
        id: "product",
        title: "What I built",
        body: "A public site presenting the club and its halls, a booking request form, an authenticated admin area listing incoming requests, and status controls that accept, reject, or delete one. The status a guest sees is the status the administrator set.",
      },
      {
        id: "problems",
        title: "What went wrong",
        body: "The first working version broke on the way to production, not in development. Mobile form layouts, authentication state, environment variables, and build settings each had to be fixed before the deployed site behaved the way the local one did.",
      },
    ],
  },
  {
    slug: "tuesday-lounge-bar",
    number: "02",
    tier: "selected",
    name: "Tuesday Lounge Bar",
    type: "Hospitality website",
    status: "Live",
    year: "2026",
    tagline:
      "A venue website for Tuesday Lounge Bar, built so the menu, location, contacts, and table enquiry stay one tap away.",
    summary:
      "Most people open a venue website on a phone while deciding where to go. The site keeps the atmosphere of the bar, but puts the practical information where a phone user reaches first.",
    problem:
      "A dark hospitality design hides important text and actions very easily. The site had to feel like the venue without making visitors hunt for basic information.",
    role: [
      "Page structure",
      "Responsive interface",
      "Frontend development",
      "Menu and contact paths",
    ],
    stack: ["Next.js", "TypeScript", "Responsive CSS", "Vercel"],
    evidence: [
      { kind: "live", label: "Live in production" },
      { kind: "repository", label: "Source on GitHub" },
      { kind: "responsive", label: "Mobile-first layout" },
      { kind: "languages", label: "Russian and Kazakh" },
    ],
    indexName: "TUESDAY",
    wordmarkLines: ["TUESDAY"],
    system: {
      caption: "Information path",
      outcomeLabel: "On mobile",
      outcome: "Practical content lifts",
      alt: "System diagram of the Tuesday Lounge Bar information path. The page runs from venue and atmosphere down through menu, location and contacts, to a table enquiry. On a small screen the menu and the location branch upward, so the practical content is reached first.",
      steps: [
        "Venue and atmosphere",
        "Menu",
        "Location and contacts",
        "Table enquiry",
        "On mobile the practical content moves up",
      ],
      nodes: [
        { label: "Venue", x: 14, y: 0, kind: "input" },
        { label: "Menu", x: 14, y: 33, kind: "core" },
        { label: "Location", x: 14, y: 66, kind: "core" },
        { label: "Enquiry", x: 14, y: 100, kind: "output" },
        { label: "Mobile order", x: 104, y: 50, kind: "gate" },
      ],
      edges: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 1, to: 4, kind: "return" },
        { from: 2, to: 4, kind: "return" },
      ],
    },
    architecture: [
      {
        layer: "Frontend",
        detail: "Content-driven pages, no backend required",
        parts: ["Next.js", "TypeScript"],
      },
      {
        layer: "Layout",
        detail: "Order and spacing change for small screens",
        parts: ["Responsive CSS"],
      },
      {
        layer: "Delivery",
        detail: "Static production build",
        parts: ["Vercel"],
      },
    ],
    decisions: [
      {
        question: "Atmosphere or usability first?",
        choice: "Contrast instead of heavy effects to separate actions from mood.",
        reason:
          "The venue needed a dark, evening look. Adding glow and blur on top of that would have buried the one thing a visitor came for.",
      },
      {
        question: "What goes at the top on a phone?",
        choice: "Practical information moves up on mobile, not down.",
        reason:
          "Desktop can afford an atmospheric opening. On a phone the first screen is most of the visit, so it has to carry the menu and the location.",
      },
      {
        question: "Does this need a backend?",
        choice: "No database and no stored form data. Direct actions only.",
        reason:
          "The venue needed reading and contacting. A backend would have added deployment surface and maintenance the project had no use for.",
      },
    ],
    result:
      "Visitors can understand the venue and reach the menu, location, contacts, or table enquiry without following a long sequence.",
    learned:
      "On a business website the order of the content matters as much as the visual style. Mobile navigation made that especially clear.",
    accent: "#d99a5c",
    liveUrl:
      process.env.NEXT_PUBLIC_TUESDAY_URL ??
      "https://tuesday-eta-eight.vercel.app/",
    repositoryUrl:
      process.env.NEXT_PUBLIC_TUESDAY_GITHUB_URL ??
      "https://github.com/nerfalmiralti-max/Tuesday",
    caseStudyUrl: "/work/tuesday-lounge-bar",
    liveLabel: "Visit website",
    sections: [
      {
        id: "context",
        title: "Context",
        body: "A lounge bar website is read in a specific situation: on a phone, in the evening, by someone deciding where to spend the next few hours. That situation set the priorities more than any design reference did.",
      },
      {
        id: "product",
        title: "What I built",
        body: "A responsive venue site presenting the bar, with direct paths to the menu, the location, the contacts, and a table enquiry. Navigation labels say what they lead to instead of describing the mood.",
      },
      {
        id: "problems",
        title: "What went wrong",
        body: "The fixes were mostly about restraint: mobile spacing, heading length, readable contrast on dark surfaces, and keeping the key actions visible without filling the screen with buttons.",
      },
    ],
  },
  {
    slug: "mangystau-trials",
    number: "03",
    tier: "prototype",
    name: "Mangystau Trials",
    type: "Hackathon prototype",
    status: "Prototype",
    year: "2026",
    tagline:
      "A travel-planning prototype for the Mangystau region, built during a hackathon. It did not reach the final.",
    summary:
      "The user sets a budget, trip length, interests, and transport. The prototype returns a route with locations, estimated time, and basic trip information, with the map and the location list in the same order.",
    problem:
      "Planning a trip across Mangystau means deciding on time, transport, interests, and budget at once. Our first version tried to support all of that before the route flow itself worked.",
    role: [
      "Product idea",
      "Page structure",
      "User flow",
      "Route interface",
      "Map",
      "Frontend development",
    ],
    stack: ["Next.js", "React", "TypeScript", "Map interface", "Vercel"],
    evidence: [
      { kind: "prototype", label: "Prototype, not a finished product" },
      { kind: "live", label: "Deployed and reachable" },
      { kind: "repository", label: "Source on GitHub" },
    ],
    indexName: "MANGYSTAU",
    wordmarkLines: ["MANGYSTAU"],
    system: {
      caption: "Route output",
      outcomeLabel: "Single output",
      outcome: "The route",
      alt: "System diagram of the Mangystau Trials route output. Budget, trip length, and interests feed one route. The route drives both the map and the location list, and the two share a single ordering.",
      steps: [
        "Budget, days, interests, transport",
        "One route is ordered from those inputs",
        "The map reads that route",
        "The location list reads the same route",
        "Map and list share one order",
      ],
      nodes: [
        { label: "Budget", x: 6, y: 4, kind: "input" },
        { label: "Days", x: 6, y: 50, kind: "input" },
        { label: "Interests", x: 6, y: 96, kind: "input" },
        { label: "Route", x: 58, y: 50, kind: "core" },
        { label: "Map", x: 120, y: 12, kind: "output" },
        { label: "List", x: 120, y: 88, kind: "output" },
      ],
      edges: [
        { from: 0, to: 3 },
        { from: 1, to: 3 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 3, to: 5 },
        { from: 4, to: 5, kind: "return" },
      ],
    },
    architecture: [
      {
        layer: "Frontend",
        detail: "Trip setup and route output in one flow",
        parts: ["Next.js", "React", "TypeScript"],
      },
      {
        layer: "Route data",
        detail: "Destinations typed and ordered by the trip preferences",
        parts: ["TypeScript"],
      },
      {
        layer: "Map",
        detail: "Destinations shown in the same order as the list",
        parts: ["Map interface"],
      },
      {
        layer: "Delivery",
        detail: "Deployed so the prototype stays reachable",
        parts: ["Vercel"],
      },
    ],
    decisions: [
      {
        question: "What is the single output of this product?",
        choice: "The route. Everything else is input to it.",
        reason:
          "We reached that answer too late. Naming the one output earlier is what would have kept the scope inside the time we had.",
      },
      {
        question: "How should the map and the list relate?",
        choice: "One shared order between map markers and location cards.",
        reason:
          "Two orderings of the same trip would make the user translate between them instead of reading a plan.",
      },
    ],
    result:
      "The project did not reach the hackathon final. A working prototype is still deployed, but it does not support every part of complete trip planning.",
    learned:
      "Define the main feature before adding supporting ideas. A smaller route demo would have explained the project better in the time we had.",
    accent: "#5fb9be",
    liveUrl:
      process.env.NEXT_PUBLIC_MANGYSTAU_TRIALS_URL ??
      "https://mangystau-trials.vercel.app/",
    repositoryUrl:
      process.env.NEXT_PUBLIC_MANGYSTAU_TRIALS_GITHUB_URL ??
      "https://github.com/nerfalmiralti-max/Mangystau-Trials",
    caseStudyUrl: "/work/mangystau-trials",
    liveLabel: "Open prototype",
    sections: [
      {
        id: "context",
        title: "Context",
        body: "The project started during a hackathon, with limited time to explain the idea, build the main flow, and show how a route responds to different travel preferences. The idea was larger than the schedule from the first hour.",
      },
      {
        id: "product",
        title: "What I built",
        body: "A trip setup grouped into one short step, and a route output with locations, estimated time, and basic trip details. I worked on the idea, the page structure, the user flow, the route interface, the map, and the frontend.",
      },
      {
        id: "problems",
        title: "What went wrong",
        body: "The scope grew faster than the time available. Map work and route detail took attention away from proving the main planning flow while it still could have changed the result.",
      },
    ],
  },
];

export const featuredProject = projects[0];

export const supportingProjects = projects.filter(
  (project) => project.tier !== "featured",
);
