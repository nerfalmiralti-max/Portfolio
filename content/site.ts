export const profile = {
  name: "Altair Tolesh",
  initials: "AT",
  location: "Aktau, Kazakhstan",
  coordinates: "43.6411° N, 51.1985° E",
  headline: "I turn ambitious ideas into working digital products.",
  role: "Student, developer, product builder, and judo athlete",
  currentProject: "Kronos",
  ageVisible: true,
  age: 14,
  schoolVisible: true,
  school: "Nazarbayev Intellectual School in Aktau",
  email: "",
  github: "",
  socials: [] as { label: string; href: string }[],
} as const;

export type ProjectSlug = "99-aktau" | "mangystau-trials" | "kronos";

export type Project = {
  slug: ProjectSlug;
  number: string;
  name: string;
  type: string;
  status: string;
  year: string;
  role: string;
  summary: string;
  message: string;
  technologies: string[];
  accent: string;
  metric?: string;
  sections: { id: string; title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "99-aktau",
    number: "01",
    name: "99 AKTAU",
    type: "Commercial full-stack website",
    status: "Completed commercial project",
    year: "2025",
    role: "Product design · Frontend · Backend · Deployment",
    summary:
      "A premium booking platform for a local PlayStation club, pairing a polished customer journey with a practical admin system.",
    message: "A real client brief carried from first decision to secure handover.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    accent: "#7467ff",
    metric: "98 performance · 100 accessibility · 100 SEO",
    sections: [
      { id: "context", title: "Context", body: "99 AKTAU needed more than a polished landing page. The club needed a clear way for guests to request a hall and for staff to manage every booking without losing the premium tone of the physical space." },
      { id: "problem", title: "Problem", body: "Booking information could become fragmented and the customer experience had no single, trustworthy digital home. The product had to reduce uncertainty for guests while keeping staff actions quick and controlled." },
      { id: "goals", title: "Goals", body: "Create a responsive booking flow, make status visible, give administrators a focused management surface, and prepare the project for reliable search, analytics, deployment, and handover." },
      { id: "role", title: "My role", body: "I owned the product structure, interface design, frontend and backend implementation, deployment configuration, and project handover. It was my first completed commercial project for a real client." },
      { id: "strategy", title: "Product strategy", body: "I separated the experience into two calm paths: a guided guest request and a compact authenticated operations view. Each screen answers one question and exposes only the next necessary action." },
      { id: "flow", title: "User flow", body: "Guests choose a hall, enter the minimum booking details, send a request, then see its state. Staff sign in, review the queue, and accept, reject, or delete requests with deliberate feedback." },
      { id: "system", title: "Design system", body: "A graphite interface, warm-white type, restrained violet accents, and precise status colors create a premium atmosphere without the visual noise common to gaming websites." },
      { id: "screens", title: "Main screens", body: "The public side includes discovery, hall selection, booking details, and confirmation. The administrative side prioritizes the current queue, readable metadata, and unambiguous status actions." },
      { id: "technical", title: "Technical implementation", body: "Next.js, TypeScript, Tailwind CSS, and Supabase connect the responsive interface to server-side booking actions and authenticated administration. Vercel handles deployment and environment configuration." },
      { id: "challenges", title: "Challenges", body: "The difficult part was not adding features. It was keeping the booking flow simple while covering validation, data states, staff controls, security boundaries, and responsive behavior." },
      { id: "tradeoffs", title: "Decisions and trade-offs", body: "I chose a request-based flow rather than pretending every slot was instantly confirmed. That decision made the interface more honest and matched how the club actually reviews bookings." },
      { id: "outcome", title: "Outcome", body: "The completed site shipped with booking and administration workflows, responsive pages, search preparation, analytics preparation, and handover documentation. Verified audits reached 98 performance, 100 accessibility, 96 best practices, and 100 SEO." },
      { id: "learned", title: "What I learned", body: "Commercial work made every invisible decision matter: permissions, empty states, environment variables, documentation, and what happens after the developer leaves the project." },
    ],
  },
  {
    slug: "mangystau-trials",
    number: "02",
    name: "Mangystau Trials",
    type: "Tourism technology platform",
    status: "Prototype · Continuing concept",
    year: "Hackathon project",
    role: "Product concept · UX · Frontend · Route logic",
    summary:
      "A personalized route-planning concept designed to make travel across Mangystau easier to understand and organize.",
    message: "A regional problem, a deadline, an imperfect result, and a useful next direction.",
    technologies: ["Next.js", "React", "Leaflet", "Prisma", "PostgreSQL"],
    accent: "#4bc6c8",
    sections: [
      { id: "context", title: "Regional problem", body: "Mangystau has remarkable destinations spread across large distances. Visitors often need to combine scattered information about routes, transport, time, and cost before they can make a realistic plan." },
      { id: "problem", title: "Target users", body: "The concept focuses on independent travelers and small groups who know what interests them but need help turning preferences and constraints into a coherent regional journey." },
      { id: "goals", title: "Product hypothesis", body: "If a traveler can define budget, duration, interests, and transport, a route engine can reduce planning effort and make less obvious places easier to discover responsibly." },
      { id: "role", title: "My role", body: "I worked on the product concept, UX structure, frontend, route logic, and technical implementation under the pressure of a hackathon deadline." },
      { id: "strategy", title: "User journey", body: "The flow moves from a short preference setup to a generated route, then into a map with timing, cost estimates, saved plans, and detail views for individual destinations." },
      { id: "flow", title: "Route generation", body: "The prototype translates constraints into a sequence of destinations. The central design question was how to make the route feel personalized while keeping the logic explainable to the traveler." },
      { id: "system", title: "Map experience", body: "Map, route line, destination cards, and budget summary work as one coordinated surface. Landscape-inspired forms and cyan route marks connect the interface to the geography without imitating a travel brochure." },
      { id: "screens", title: "Technical decisions", body: "React and Next.js support the application shell, Leaflet handles map exploration, and the data model was explored through Prisma with PostgreSQL or Supabase as potential persistence layers." },
      { id: "technical", title: "Hackathon experience", body: "The project was created during a hackathon and did not pass the final selection. That result is part of the case study, not something to hide or rewrite." },
      { id: "challenges", title: "What did not work", body: "The first version tried to solve too much inside the available time. Route quality, data depth, and the clarity of the main promise needed stronger prioritization." },
      { id: "tradeoffs", title: "Decisions and trade-offs", body: "I kept the route generator as a testable prototype rather than presenting incomplete hotel and transport integrations as finished functionality." },
      { id: "outcome", title: "What I learned", body: "A competition result is one kind of feedback. The more useful lesson was learning to reduce scope, show the core hypothesis faster, and separate a persuasive demo from a dependable product." },
      { id: "learned", title: "Future potential", body: "The concept can continue through better regional data, route safety notes, seasonal constraints, local business integrations, and testing with actual Mangystau travelers." },
    ],
  },
  {
    slug: "kronos",
    number: "03",
    name: "Kronos",
    type: "Productivity and life-planning system",
    status: "In development · Ongoing experiment",
    year: "Current",
    role: "Concept · UX direction · Visual design · Frontend architecture",
    summary:
      "A visual planning system that makes time visible across today, months, years, and long-term goals.",
    message: "An exploration of whether seeing time clearly can change how it is used.",
    technologies: ["React", "Next.js", "TypeScript", "Expo", "Supabase", "PWA"],
    accent: "#d5ff67",
    sections: [
      { id: "context", title: "Context", body: "Most planning tools are good at storing tasks but weak at showing the scale of time around them. Kronos began with a question: what changes when progress through a day, month, or year becomes visible?" },
      { id: "problem", title: "Problem", body: "A long task list can create activity without direction. People need a way to connect immediate focus with larger goals without turning life into an exhausting dashboard." },
      { id: "goals", title: "Goals", body: "Explore a calm planning system for today, goals, calendar, focus, and progress. Make time understandable at a glance while keeping every percentage grounded in a real period or intention." },
      { id: "role", title: "My role", body: "Kronos is my ongoing product experiment. I lead the concept, UX direction, visual language, frontend architecture, and the decisions about what should be tested next." },
      { id: "strategy", title: "Product strategy", body: "The product starts with visibility before automation. Today, focus, and long-range progress form a connected system, but each module must prove that it reduces friction before it becomes permanent." },
      { id: "flow", title: "User flow", body: "A user opens Today, sees current progress, chooses one meaningful focus, checks goals in context, and reviews time at different scales without leaving the same visual language." },
      { id: "system", title: "Design system", body: "Rings, calendar fields, quiet grids, and a restrained acid-lime accent give time a physical presence. Light and dark themes are being explored without changing the information hierarchy." },
      { id: "screens", title: "Main screens", body: "Current concepts include Today, Goals, Calendar, Focus Timer, and Analytics. These are interface explorations, not claims of launched functionality." },
      { id: "technical", title: "Technical implementation", body: "The idea has moved between Expo and React Native experiments and a web-based Next.js direction. TypeScript, Supabase, PWA support, and reusable progress components are under evaluation." },
      { id: "challenges", title: "Challenges", body: "The main challenge is preventing progress visualization from becoming pressure. The system should support intentional choices, not reward users for turning every moment into a metric." },
      { id: "tradeoffs", title: "Decisions and trade-offs", body: "I am moving toward a web product to iterate faster across devices, while keeping the mobile interaction lessons from the earlier application concept." },
      { id: "outcome", title: "Current state", body: "Kronos remains in development. The strongest result so far is a clearer product thesis and a reusable visual system for testing how different time scales relate." },
      { id: "learned", title: "What I am learning", body: "An unfinished product still needs honest boundaries. Good product work includes deciding which attractive ideas not to present as ready." },
    ],
  },
];

export const journey = [
  { period: "Early stage", category: "Learn", title: "Started learning web development", story: "Moved from consuming technology to understanding how interfaces and systems are made.", lesson: "The fastest way to understand a tool is to make something with it." },
  { period: "Exploration", category: "Build", title: "Built early product experiments", story: "Tested landing pages, mobile concepts, maps, motion, and small interface systems.", lesson: "Small projects reveal which questions are worth pursuing." },
  { period: "Hackathon", category: "Compete", title: "Created Mangystau Trials", story: "Built a personalized tourism route prototype under a deadline. It did not reach the final selection.", lesson: "An unsuccessful result can still expose a stronger product direction." },
  { period: "Commercial work", category: "Build", title: "Shipped 99 AKTAU", story: "Designed, developed, deployed, and documented a complete booking website for a real client.", lesson: "Shipping includes the quiet work: states, security, deployment, and handover." },
  { period: "Ongoing", category: "Train", title: "Kept returning to the mat", story: "Balanced school, product work, and judo training through repetition rather than perfect routines.", lesson: "Progress often becomes visible only after the work has accumulated." },
  { period: "Now", category: "Build", title: "Developing Kronos", story: "Exploring how a planning system can show time without making life feel mechanical.", lesson: "A clear product thesis matters more than a long feature list." },
  { period: "Ahead", category: "Future", title: "Larger products and international study", story: "Improving English, engineering fundamentals, and product judgment while preparing for global opportunities.", lesson: "Ambition becomes useful when it produces today’s next step." },
] as const;

export const experiments = [
  "Interactive football interface",
  "AI-assisted video editing concept",
  "Mobile application studies",
  "Tourism interface experiments",
  "Motion and design-system tests",
  "AI-assisted development workflows",
];

export const capabilities = {
  Product: ["Product thinking", "User flows", "Feature prioritization", "MVP planning"],
  Design: ["UI/UX", "Responsive design", "Interaction design", "Design systems"],
  Engineering: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "APIs", "Deployment"],
  Execution: ["Client communication", "Debugging", "Testing", "Documentation", "Project handover"],
};

export const translations = {
  en: {
    nav: { work: "Work", about: "About", journey: "Journey", contact: "Contact" },
    status: "Building Kronos",
    language: "Language",
    theme: "Toggle color theme",
    menu: "Open navigation",
    close: "Close navigation",
    hero: {
      eyebrow: "Altair Tolesh — Aktau, Kazakhstan",
      title: "I turn ambitious ideas into working digital products.",
      intro: "I am a student, developer, and product builder focused on thoughtful interfaces, useful technology, and real-world execution.",
      work: "Explore my work",
      journey: "My journey",
      note: "14 years old. Building seriously.",
    },
    sections: { proof: "Proof, not promises", work: "Selected work", philosophy: "A working principle", capabilities: "How I build", journey: "The trajectory so far", discipline: "Built through repetition", future: "What I am building toward", experiments: "Playground", contact: "Have an idea worth building?" },
    footer: "This is not a finished career. It is the beginning of a serious trajectory.",
  },
  ru: {
    nav: { work: "Проекты", about: "Обо мне", journey: "Путь", contact: "Контакт" },
    status: "Создаю Kronos",
    language: "Язык",
    theme: "Сменить тему",
    menu: "Открыть навигацию",
    close: "Закрыть навигацию",
    hero: {
      eyebrow: "Алтаир Толеш — Актау, Казахстан",
      title: "Я превращаю амбициозные идеи в работающие цифровые продукты.",
      intro: "Я школьник, разработчик и создатель продуктов. Мне важны продуманные интерфейсы, полезные технологии и реальная реализация.",
      work: "Смотреть проекты",
      journey: "Мой путь",
      note: "14 лет. Серьёзный подход к делу.",
    },
    sections: { proof: "Факты вместо обещаний", work: "Избранные проекты", philosophy: "Рабочий принцип", capabilities: "Как я создаю", journey: "Путь до сегодняшнего дня", discipline: "Результат повторения", future: "К чему я иду", experiments: "Эксперименты", contact: "Есть идея, которую стоит воплотить?" },
    footer: "Это не завершённая карьера. Это начало серьёзной траектории.",
  },
  kk: {
    nav: { work: "Жобалар", about: "Мен туралы", journey: "Жолым", contact: "Байланыс" },
    status: "Kronos жасап жатырмын",
    language: "Тіл",
    theme: "Түсті ауыстыру",
    menu: "Навигацияны ашу",
    close: "Навигацияны жабу",
    hero: {
      eyebrow: "Алтаир Толеш — Ақтау, Қазақстан",
      title: "Мен өршіл идеяларды жұмыс істейтін цифрлық өнімдерге айналдырамын.",
      intro: "Мен ойластырылған интерфейстерге, пайдалы технологияға және нақты іске асыруға көңіл бөлетін оқушы, әзірлеуші және өнім жасаушымын.",
      work: "Жобаларды көру",
      journey: "Менің жолым",
      note: "14 жаста. Іске байыппен қараймын.",
    },
    sections: { proof: "Уәде емес, дәлел", work: "Таңдаулы жобалар", philosophy: "Жұмыс қағидасы", capabilities: "Қалай жасаймын", journey: "Бүгінге дейінгі жол", discipline: "Қайталау арқылы қалыптастым", future: "Қай бағытта өсіп келемін", experiments: "Тәжірибелер", contact: "Іске асыруға тұрарлық идеяңыз бар ма?" },
    footer: "Бұл аяқталған мансап емес. Бұл маңызды жолдың басталуы.",
  },
} as const;

export type Locale = keyof typeof translations;
