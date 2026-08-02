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
  shortDescription: string;
  homepageDescription: string;
  role: string[];
  stack: string[];
  challenge: string;
  result: string;
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
    name: "99 AKTAU",
    type: "Commercial website",
    status: "Completed",
    year: "2025",
    shortDescription:
      "A website for a PlayStation club in Aktau with booking requests and an admin area.",
    homepageDescription:
      "Visitors can choose a hall and send a booking request. The administrator can open the request, accept it, reject it, or delete it. The guest can then see the updated status.",
    role: [
      "Interface design",
      "Responsive frontend",
      "Supabase integration",
      "Admin authentication",
      "Booking statuses",
      "Deployment setup",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    challenge:
      "The booking flow had to stay simple for guests without making the admin side too limited.",
    result: "The public website and admin tools now work as one system.",
    accent: "#8074ff",
    liveUrl:
      process.env.NEXT_PUBLIC_99_AKTAU_URL ??
      "https://99-aktau.vercel.app/",
    repositoryUrl: process.env.NEXT_PUBLIC_99_AKTAU_GITHUB_URL ?? "",
    caseStudyUrl: "/work/99-aktau",
    liveLabel: "Visit website",
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: "99 AKTAU is a website for a PlayStation club in Aktau. Its main purpose is to let guests send booking requests and let the administrator manage them.",
      },
      {
        id: "context",
        title: "Project context",
        body: "This was my first commercial project. The club needed a public website and a practical admin area, not two separate tools with different booking information.",
      },
      {
        id: "role",
        title: "My role",
        body: "I designed the website, built the responsive frontend, connected Supabase, added admin authentication, implemented booking statuses, and prepared the project for deployment.",
      },
      {
        id: "problem",
        title: "The problem",
        body: "Guests needed a short booking form. The administrator still needed enough information to accept, reject, or remove a request without contacting the guest first.",
      },
      {
        id: "flow",
        title: "User flow",
        body: "The guest chooses a hall, enters the booking details, and sends the request. The administrator reviews it and changes the status. The guest can then see the updated status.",
      },
      {
        id: "decisions",
        title: "Interface decisions",
        body: "I kept the guest form short and placed the main details in a clear order. Admin actions use distinct labels so accepting, rejecting, and deleting are difficult to confuse.",
      },
      {
        id: "implementation",
        title: "Technical implementation",
        body: "Next.js handled the application structure. TypeScript kept form and status data consistent. Supabase stored booking requests and handled authentication. Vercel hosted the production build.",
      },
      {
        id: "problems",
        title: "Problems encountered",
        body: "I had to fix mobile form layouts, authentication states, environment variables, and build settings before the public and admin flows worked correctly after deployment.",
      },
      {
        id: "result",
        title: "Result",
        body: "The public website and admin tools now work as one system. Guests can send requests, and the club can manage each request from the admin area.",
      },
      {
        id: "learned",
        title: "What I learned",
        body: "A commercial website is not finished when the public pages look correct. The owner also needs reliable controls, deployment settings, and clear handover notes.",
      },
    ],
  },
  {
    slug: "tuesday-lounge-bar",
    number: "02",
    name: "Tuesday Lounge Bar",
    type: "Lounge bar website",
    status: "Live",
    year: "2026",
    shortDescription:
      "A website for Tuesday Lounge Bar focused on the venue, menu, contacts, and table enquiries.",
    homepageDescription:
      "The main information had to be easy to find on a phone. The design also needed to match the atmosphere of the venue without making the pages slow or difficult to read.",
    role: [
      "Page structure",
      "Responsive interface",
      "Frontend development",
      "Menu and contact paths",
    ],
    stack: ["Next.js", "TypeScript", "Responsive CSS", "Vercel"],
    challenge:
      "The difficult part was balancing the dark visual style with clear navigation and readable content.",
    result:
      "Visitors can quickly understand the venue and find the action they need.",
    accent: "#d29a62",
    liveUrl:
      process.env.NEXT_PUBLIC_TUESDAY_URL ??
      "https://tuesday-eta-eight.vercel.app/",
    repositoryUrl: process.env.NEXT_PUBLIC_TUESDAY_GITHUB_URL ?? "",
    caseStudyUrl: "/work/tuesday-lounge-bar",
    liveLabel: "Visit website",
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: "Tuesday Lounge Bar is a venue website for visitors in Aktau. It presents the atmosphere while keeping the menu, location, contacts, and table enquiry action easy to find.",
      },
      {
        id: "context",
        title: "Project context",
        body: "Most visitors open a venue website on a phone and want practical information quickly. The site also needed enough visual character to match the lounge bar.",
      },
      {
        id: "role",
        title: "My role",
        body: "I organized the pages, designed the responsive interface, developed the frontend, and created clear links to the menu, location, contacts, and reservation action.",
      },
      {
        id: "problem",
        title: "The problem",
        body: "A dark hospitality design can easily hide important text and actions. The site needed to feel appropriate for the venue without making visitors search for basic information.",
      },
      {
        id: "flow",
        title: "User flow",
        body: "A visitor can understand the venue, check the menu and practical details, find the location, and move to the table enquiry action without following a long sequence.",
      },
      {
        id: "decisions",
        title: "Interface decisions",
        body: "I kept navigation labels direct, moved practical information higher on mobile, and used contrast instead of heavy effects to separate actions from atmospheric content.",
      },
      {
        id: "implementation",
        title: "Technical implementation",
        body: "Next.js provided the page structure. TypeScript supported the components and content. Responsive CSS changed the order and spacing for smaller screens. Vercel handled deployment.",
      },
      {
        id: "problems",
        title: "Problems encountered",
        body: "The main fixes involved mobile spacing, heading length, readable contrast on dark surfaces, and keeping key actions visible without filling the screen with buttons.",
      },
      {
        id: "result",
        title: "Result",
        body: "Visitors can quickly understand the venue and find the menu, location, contacts, and table enquiry action.",
      },
      {
        id: "learned",
        title: "What I learned",
        body: "On a business website, the order of the content matters as much as the visual style. Mobile navigation made that especially clear.",
      },
    ],
  },
  {
    slug: "mangystau-trials",
    number: "03",
    name: "Mangystau Trials",
    type: "Hackathon project",
    status: "Prototype",
    year: "2026",
    shortDescription:
      "A travel-planning prototype for people visiting the Mangystau region.",
    homepageDescription:
      "The user chooses a budget, trip length, interests, and transport. The project then presents a route with locations, estimated time, and basic trip information.",
    role: [
      "Product idea",
      "Page structure",
      "User flow",
      "Route interface",
      "Map",
      "Frontend development",
    ],
    stack: ["Next.js", "React", "TypeScript", "Map interface", "Vercel"],
    challenge:
      "We had limited time, so we had to decide which features were necessary for the first version.",
    result:
      "The project did not reach the hackathon final. It still taught me how quickly an idea becomes too large when the main feature is not defined early enough.",
    accent: "#65b8bd",
    liveUrl:
      process.env.NEXT_PUBLIC_MANGYSTAU_TRIALS_URL ??
      "https://mangystau-trials.vercel.app/",
    repositoryUrl:
      process.env.NEXT_PUBLIC_MANGYSTAU_TRIALS_GITHUB_URL ?? "",
    caseStudyUrl: "/work/mangystau-trials",
    liveLabel: "Open prototype",
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: "Mangystau Trials is a travel-planning prototype for visitors to the region. It uses trip preferences to present a route with locations, estimated time, and basic information.",
      },
      {
        id: "context",
        title: "Project context",
        body: "The project began during a hackathon. We had limited time to explain the idea, build the main flow, and show how a route could respond to different travel preferences.",
      },
      {
        id: "role",
        title: "My role",
        body: "I worked on the idea, page structure, user flow, route interface, map, and frontend.",
      },
      {
        id: "problem",
        title: "The problem",
        body: "Planning a trip across Mangystau requires decisions about time, transport, interests, and budget. Our first idea included too many supporting features before the route flow was clear.",
      },
      {
        id: "flow",
        title: "User flow",
        body: "The user chooses a budget, trip length, interests, and transport. The prototype then shows a suggested route, locations, estimated time, and basic trip details.",
      },
      {
        id: "decisions",
        title: "Interface decisions",
        body: "We grouped the trip inputs into one short setup and made the route the main output. The map and location cards share the same order so the user can compare them.",
      },
      {
        id: "implementation",
        title: "Technical implementation",
        body: "Next.js and React provided the application structure. TypeScript supported the route data. The map interface connected the destinations to the proposed order of the trip.",
      },
      {
        id: "problems",
        title: "Problems encountered",
        body: "The scope grew faster than the available time. Map work and route details took attention away from proving the main planning flow early enough.",
      },
      {
        id: "result",
        title: "Result",
        body: "The project did not reach the hackathon final. A working prototype remains available, but it does not support every part of complete trip planning.",
      },
      {
        id: "learned",
        title: "What I learned",
        body: "I learned to define the main feature before adding supporting ideas. A smaller route demo would have explained the project more clearly during the hackathon.",
      },
    ],
  },
];
