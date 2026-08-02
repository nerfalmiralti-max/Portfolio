# Altair Tolesh Portfolio

A multi-page portfolio for Altair Tolesh, a student and web developer from Aktau, Kazakhstan.

## Routes

- `/` - short portfolio overview
- `/work` - project directory
- `/work/99-aktau` - commercial website case study
- `/work/tuesday-lounge-bar` - lounge bar website case study
- `/work/mangystau-trials` - hackathon project case study
- `/about` - school, learning, projects, and judo
- `/process` - working process and current skills
- `/journey` - factual project timeline
- `/contact` - project enquiry form
- `/privacy` - privacy information

Legacy `/projects` URLs redirect to their matching `/work` routes.

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

The default build targets Sites and Cloudflare Workers. `npm run build:vercel` runs the Vercel-compatible Next.js build configured by `vercel.json`.

## Public links and copy

Public copy is stored in `content/profile.ts`, `content/projects.ts`, `content/process.ts`, `content/journey.ts`, and `content/navigation.ts`. The three supplied live project URLs are included as defaults.

Copy `.env.example` to `.env.local` to override a project URL, public repository, contact email, or GitHub profile. External actions render only when their URL exists. If no public email is configured, the contact form checks the message and offers a local copy instead of claiming it was sent.
