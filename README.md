# Altair Tolesh — Portfolio

A multi-page portfolio for Altair Tolesh, a product designer and web developer from Aktau, Kazakhstan.

## Routes

- `/` — portfolio overview
- `/projects` — selected work directory
- `/projects/99-aktau` — commercial booking-system case study
- `/projects/tuesday-lounge-bar` — hospitality website case study
- `/projects/mangystau-trials` — tourism product case study
- `/about` — personal story, education, and judo
- `/journey` — project and learning timeline
- `/contact` — privacy-conscious contact flow
- `/privacy` — privacy information

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

The default build targets Sites/Cloudflare Workers. `npm run build:vercel` is the Vercel-compatible Next.js build selected by `vercel.json`.

## Public links

Project links are centralized in `content/site.ts`. The three live URLs supplied for the portfolio are included as safe defaults. Copy `.env.example` to `.env.local` to override any public domain, repository link, contact email, or GitHub profile without changing source code.

An external-link action is rendered only when its URL is present. When no public email is configured, the contact form validates the message and offers a local copy instead of claiming it was sent.
