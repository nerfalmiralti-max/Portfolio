# Altair Tolesh — Portfolio

A multi-page portfolio for Altair Tolesh, a student, developer, product builder, and judo athlete from Aktau, Kazakhstan.

## Routes

- `/` — portfolio overview
- `/projects` — work directory and experiments
- `/projects/99-aktau` — commercial booking-platform case study
- `/projects/mangystau-trials` — tourism-platform case study
- `/projects/kronos` — planning-product case study
- `/about` — personal story, education, judo, and direction
- `/journey` — interactive timeline
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

## Content and public contact details

Edit `content/site.ts` to change profile facts, project statuses, case-study copy, timeline entries, experiments, capabilities, or interface translations.

Copy `.env.example` to `.env.local` when a public domain or contact email is available:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
```

When no public email is configured, the contact form validates the message and offers a local copy instead of claiming it was sent.
