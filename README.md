# RACE50 (50points)

Free-to-play horse racing tournament platform built with Next.js 14, Prisma, and SQLite.

## Project structure

```
├── docs/screenshots/     # UI verification screenshots
├── deploy/               # Deployment notes & legacy static export
├── prisma/               # Database schema
├── public/images/        # Static assets
├── scripts/              # CLI utilities (fetch races, etc.)
└── src/
    ├── app/              # Next.js App Router (pages & API)
    ├── components/
    │   ├── auth/         # Authentication UI
    │   ├── layout/       # Header, Footer, Providers
    │   ├── tournament/   # Race cards, picks, tickets, chat
    │   └── ui/           # Shared UI primitives
    ├── contexts/         # React context (auth)
    └── lib/
        ├── auth/         # JWT & password helpers
        ├── config/       # basePath & URL helpers
        ├── data/         # Mock data, race data, admin storage
        ├── db/           # Prisma client
        ├── i18n/         # Translations (ES/EN)
        ├── scoring/      # Points engine
        └── services/     # External racing API client
```

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
cp .env.example .env
npm run db:push
```

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to [http://localhost:3000/50points](http://localhost:3000/50points).

### Seed sample tournaments (optional)

With the dev server running:

```bash
curl -X POST http://localhost:3000/50points/api/admin/seed
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server (after build) |
| `npm run lint` | ESLint |
| `npm run db:push` | Apply Prisma schema to SQLite |
| `npm run fetch:races` | Fetch race data into `src/lib/data/fetchedData.json` |

## Configuration

- `basePath: /50points` in `next.config.mjs` (GitHub Pages subdirectory).
- Use `src/lib/config/paths.js` helpers for API URLs and assets.
- Plain `<img>` tags: `/50points/images/...` · `next/image`: `/images/...`
