# Altair Tolesh Portfolio

Portfolio for Altair Tolesh, a student and web developer from Aktau, Kazakhstan.

## Routes

- `/` — hero, featured project, selected work, process, contact
- `/work` — featured project plus the rest of the work
- `/work/99-aktau` — commercial booking site case study
- `/work/tuesday-lounge-bar` — hospitality site case study
- `/work/mangystau-trials` — hackathon prototype case study
- `/about` — background, process (`#process`), project lessons (`#lessons`), tools
- `/contact` — project enquiry form
- `/privacy` — privacy information (noindex)

Redirects, kept so old links stay working:

| From | To |
| --- | --- |
| `/projects` | `/work` |
| `/projects/:slug` | `/work/:slug` |
| `/process` | `/about#process` |
| `/journey` | `/about#lessons` |

## Content

All public copy lives in `content/`:

- `projects.ts` — the project model: tier, evidence, architecture layers, key
  decisions, links. This drives the homepage, `/work`, and every case study.
- `profile.ts` — identity and page copy
- `process.ts` — the process steps and tool groups
- `journey.ts` — what each project taught
- `navigation.ts` — primary navigation

Nothing on the site asserts a number that cannot be checked by following one of
its own links. There are no invented metrics, testimonials, or client counts.

## Design system

- `app/tokens.css` — colour, type scale, spacing, radius, duration, easing.
  Values outside this file need a reason to exist.
- `app/globals.css` — component styles, built on those tokens.
- `app/motion.css` — one scroll reveal primitive and one hero entrance.

Motion is gated on `html[data-motion]`, set before first paint. With scripting
off, or when an animation cannot be trusted to finish, the attribute is absent
or `"off"` and the page renders as plain, fully visible content.

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` builds first, then asserts against the server-rendered HTML: every
route renders, content is present without client JS, case studies carry their
live and repository links, redirects still resolve, and no fabricated product
data appears in the project schematics.

The default build targets Cloudflare Workers. `npm run build:vercel` runs the
Vercel-compatible Next.js build configured by `vercel.json`.

## Configuration

Copy `.env.example` to `.env.local` to override any public URL or the contact
email. Every value is optional; the defaults point at the live deployments.
