# Verdana Post-Sort Operator PWA

Mobile-first Progressive Web App for Verdana Protocol facility operators. Built with **Next.js**, TanStack Query, and Tailwind CSS.

## Features

- **Plastic Processing** and **Organic Bioconversion** workflows
- Active batch tracking on the facility floor
- Multi-step stream wizards with validation
- Carbon credit mint flow (demo)
- Offline-first with IndexedDB persistence
- Installable PWA with service worker caching

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- TanStack Query
- Tailwind CSS v4
- `@ducanh2912/next-pwa`
- IndexedDB via `idb`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4000](http://localhost:4000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build + PWA assets |
| `npm run start` | Serve production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |

## Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_DATA_SOURCE=mock   # mock | api
NEXT_PUBLIC_API_BASE_URL=/api  # used when NEXT_PUBLIC_DATA_SOURCE=api
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard |
| `/streams/[streamId]?step=N&batchId=…` | Stream wizard |
| `/batches/[batchId]` | Batch detail / mint |

## Data Layer

The app uses a `DataAdapter` interface. The default `MockAdapter` stores batches in IndexedDB. To connect a real API, implement `ApiAdapter` in `src/lib/api/adapter.ts` and set `NEXT_PUBLIC_DATA_SOURCE=api`.

## Deploy

Configured for Vercel. PWA service worker is generated on production build only.

```bash
npm run build
npm run start
```

## Reference

UI and flows modeled after [verdana-sandy.vercel.app](https://verdana-sandy.vercel.app/) with English copy and improved UX.
