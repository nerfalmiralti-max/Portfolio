# Altair Tolesh Portfolio

Portfolio for Altair Tolesh — web design and development.

## Routes

- `/` — hero, work index, checkable facts, approach, process, contact
- `/work` — the same index, plus a record for each project
- `/work/99-aktau` — commercial booking site case study
- `/work/tuesday-lounge-bar` — hospitality site case study
- `/work/mangystau-trials` — hackathon prototype case study
- `/about` — manifesto, background, what each project corrected (`#lessons`), tools
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
  decisions, the system diagram, links. This drives the homepage, `/work`, and
  every case study.
- `profile.ts` — identity and page copy
- `process.ts` — the process stages and tool groups
- `journey.ts` — what each project taught
- `navigation.ts` — primary navigation

Nothing on the site asserts a number that cannot be checked by following one of
its own links. There are no invented metrics, testimonials, or client counts.

## What this site does not publish

The public site describes the work, not the person behind it. It states no
city, country, campus, timezone, address, schedule, or study plan, and there
are no coordinates in any generated image. `tests/rendered-html.test.mjs` fails
the build if any of that reappears in the rendered HTML of any route.

## Project visuals

There are no screenshots, photographs, or raster assets anywhere in the
portfolio. Each project is presented as an abstract system diagram drawn by the
page itself from the project's own structure — nodes for its real parts, edges
for the real relationships between them, and nothing invented to fill it out.

`components/system-diagram.tsx` renders them. Geometry is slot-based, so node 0
of one project animates into node 0 of the next and moving between projects
reads as one system being reconfigured rather than three drawings swapping
places. `SystemSteps` renders the same system in words for small screens, for
print, and for no scripting at all.

## Design system

- `app/tokens.css` — colour, type scale, spacing, radius, duration, easing.
  Values outside this file need a reason to exist.
- `app/globals.css` — component styles, built on those tokens.
- `app/motion.css` — the motion system, in six categories: hero entrance,
  scroll state, section transitions, diagram motion, route transition, and one
  generic reveal for supporting content.

Motion rules:

- Nothing moves unless the reader caused it — load, scroll, pointer, focus, or
  press. There is no ambient animation on any page.
- Major moments get their own transition. The generic reveal is a fallback for
  content nobody choreographed, not the site's motion design.
- Transform, opacity, and clip-path only.

Motion is gated on `html[data-motion]`, set before first paint. With scripting
off, or when an animation cannot be trusted to finish, the attribute is absent
or `"off"` and the page renders as plain, fully visible content. Scroll-driven
effects sit behind `@supports (animation-timeline: view())` and the project
route transition behind a `document.startViewTransition` check, so neither is
required for the site to work.

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
live and repository links, redirects still resolve, no raster image or `<img>`
appears anywhere, no fabricated product data appears in the schematics, and no
route exposes a location, a school, or a timezone.

The default build targets Cloudflare Workers. `npm run build:vercel` runs the
Vercel-compatible Next.js build configured by `vercel.json`.

## Configuration

Copy `.env.example` to `.env.local` to override any public URL or the contact
email. Every value is optional; the defaults point at the live deployments.
