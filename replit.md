# Caplan Environmental Ltd — Pest Control Website

A marketing and booking website for Caplan Environmental Ltd, an eco-friendly pest control company.

## Stack

- **Framework**: TanStack Start (SSR) + TanStack Router (file-based routing)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui components
- **Backend**: Supabase (database + auth)
- **Email**: Resend
- **Build**: Vite 8 via `@lovable.dev/vite-tanstack-config`

## Routes

| File | URL | Purpose |
|------|-----|---------|
| `src/routes/index.tsx` | `/` | Homepage (hero, services, industries, reviews) |
| `src/routes/book.tsx` | `/book` | Booking form |
| `src/routes/contact.tsx` | `/contact` | Contact form |

## Running Locally

```sh
npm run dev   # starts on http://localhost:5000
```

## Environment Variables

Copy `.env.example` and fill in your values:

| Variable | Where to find it | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project → Settings → API | Yes (server-side) |
| `RESEND_API_KEY` | resend.com → API Keys | Yes (email sending) |

Set these as Replit Secrets (never commit real values).

## User Preferences

- Keep the existing TanStack Start + file-based routing structure.
- Do not restructure or migrate to a different framework.
