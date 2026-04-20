# kosha — Admin & Analytics Dashboard

Modern admin dashboard built with Vite + React 19, Tailwind v4, Radix UI, Recharts, and Framer Motion.

## Features

- Marketing, Analytics, eCommerce dashboards with seeded mock data
- Data tables (sort / search / pagination) via @tanstack/react-table
- Forms, Calendar (month grid), Profile, Auth (Sign in / Sign up)
- Command palette (⌘K)
- Notifications popover with unread state
- Light + dark mode (class strategy, persisted)
- Responsive: desktop sidebar / mobile drawer
- Full a11y: skip-to-content, aria-labels, focus rings, reduced-motion

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Zero-config deploy on Vercel — framework preset: **Vite**.
Build command: `npm run build` · Output: `dist`

## Routes

- `/` — Marketing overview
- `/analytics` · `/ecommerce` · `/calendar` · `/profile` · `/tables` · `/forms`
- `/signin` · `/signup` (standalone, outside dashboard shell)

## Stack

React 19.2 · Vite 7 · Tailwind CSS v4 · Radix UI · cmdk · Recharts 3 · Framer Motion 12 · react-router 7 · @tanstack/react-table · date-fns · sonner · lucide-react
