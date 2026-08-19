/**
 * One canonical process list. Each step carries a real example from one of the
 * three projects, so the page is evidence rather than a generic checklist.
 */
export const processSteps = [
  {
    number: "01",
    title: "Understand",
    body: "Collect the business information, the required pages, the main actions, and the technical limits.",
    example:
      "99 AKTAU: the guest and the administrator needed the same booking to make sense from two sides.",
  },
  {
    number: "02",
    title: "Structure",
    body: "Decide how the pages connect and where each piece of information belongs.",
    example:
      "Tuesday: practical information moves above the atmospheric content on a phone.",
  },
  {
    number: "03",
    title: "Design",
    body: "Build the layouts, typography, components, mobile version, and interaction states.",
    example:
      "99 AKTAU: accept, reject, and delete got labels that are hard to confuse.",
  },
  {
    number: "04",
    title: "Build",
    body: "Develop the frontend, and connect forms, databases, authentication, or APIs when the project needs them.",
    example:
      "Tuesday needed no backend, so it did not get one.",
  },
  {
    number: "05",
    title: "Test",
    body: "Check mobile screens, links, forms, error states, loading speed, and the production build.",
    example:
      "99 AKTAU: most of the real bugs only appeared in the deployed build.",
  },
  {
    number: "06",
    title: "Deliver",
    body: "Configure deployment, environment variables, metadata, and the notes the owner will need later.",
    example:
      "The client keeps a working admin area, not a project only I can operate.",
  },
] as const;

export const skillGroups = [
  {
    title: "Design",
    items: [
      "Page structure",
      "Responsive layouts",
      "Typography",
      "UI components",
      "Interaction states",
    ],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "CSS"],
  },
  {
    title: "Backend and services",
    items: ["Supabase", "Authentication", "Forms", "Server Actions", "API connections"],
  },
  {
    title: "Deployment",
    items: ["GitHub", "Vercel", "Environment variables", "SEO setup", "Handover notes"],
  },
] as const;
