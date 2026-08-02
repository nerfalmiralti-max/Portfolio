export const homepageProcessSteps = [
  {
    number: "01",
    title: "Understand the request",
    body: "I collect the business information, required pages, main actions, and technical requirements.",
  },
  {
    number: "02",
    title: "Plan the structure",
    body: "I decide how the pages connect and where each piece of information belongs.",
  },
  {
    number: "03",
    title: "Design the interface",
    body: "I create the layouts, typography, components, mobile version, and interaction states.",
  },
  {
    number: "04",
    title: "Build the website",
    body: "I develop the frontend and connect forms, databases, authentication, or APIs when they are needed.",
  },
  {
    number: "05",
    title: "Test it",
    body: "I check mobile screens, links, forms, error states, loading speed, and the production build.",
  },
  {
    number: "06",
    title: "Publish and prepare handover",
    body: "I configure deployment, environment variables, documentation, and the details the project owner will need later.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Collect information",
    body: "I ask for the business details, available content, required pages, examples, deadline, and technical limits.",
  },
  {
    number: "02",
    title: "Define pages and actions",
    body: "I list what visitors need to find and what they should be able to do on each page.",
  },
  {
    number: "03",
    title: "Plan the site structure",
    body: "I connect the pages, organize the navigation, and place information where visitors expect to find it.",
  },
  {
    number: "04",
    title: "Design desktop and mobile layouts",
    body: "I work on both sizes together, then check typography, spacing, touch targets, and important states.",
  },
  {
    number: "05",
    title: "Build the frontend",
    body: "I develop the pages and reusable components in React, Next.js, and TypeScript.",
  },
  {
    number: "06",
    title: "Connect required services",
    body: "I add forms, databases, authentication, or API connections only when the project needs them.",
  },
  {
    number: "07",
    title: "Test forms and edge cases",
    body: "I test valid and invalid input, empty states, errors, mobile navigation, links, and browser history.",
  },
  {
    number: "08",
    title: "Optimize performance",
    body: "I remove unnecessary scripts and effects, check image sizes, and review the production version on mobile.",
  },
  {
    number: "09",
    title: "Deploy",
    body: "I configure the host, environment variables, domains, metadata, and the production build.",
  },
  {
    number: "10",
    title: "Prepare documentation and handover",
    body: "I record the settings and routine tasks the project owner will need after launch.",
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
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend and services",
    items: ["Supabase", "Authentication", "Forms", "Server Actions", "API connections"],
  },
  {
    title: "Deployment",
    items: ["GitHub", "Vercel", "Environment variables", "SEO setup", "Project documentation"],
  },
] as const;
