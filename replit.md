# ISO Hub - Workspace

## Overview

ISO Hub is an Indonesian ISO certification/consulting platform, migrated from Next.js to a pnpm monorepo with Vite + React frontend and Express API backend.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: Vite + React (SPA) at `/` via `@workspace/iso-hub`
- **Routing**: wouter (client-side SPA routing)
- **API framework**: Express 5 (`@workspace/api-server`) at `/api`
- **Database**: PostgreSQL + Drizzle ORM (`@workspace/db`)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle for API)

## Architecture

```
artifacts/
  iso-hub/        — React + Vite frontend (previewPath: /)
  api-server/     — Express API server (previewPath: /api)
lib/
  db/             — Shared Drizzle ORM schema + client (@workspace/db)
  api-spec/       — OpenAPI spec + codegen
```

## Key Artifacts

- **ISO Hub frontend**: `artifacts/iso-hub/src/` — 25+ pages, all converted from Next.js to client-side React
- **API server**: `artifacts/api-server/src/routes/` — REST API with PostgreSQL data access

## Key Routes (Frontend)

| Path | Description |
|------|-------------|
| `/` | Home/dashboard with menu tiles |
| `/risiko` | Risk Management (ISO 31000) |
| `/audit` | Audit Management (ISO 19011) |
| `/fasilitator` | Facilitator Directory |
| `/perpustakaan` | ISO Library/Articles |
| `/sertifikasi` | Certification Roadmap |
| `/opc` | OPC CLAW Multi-agent Console |
| `/vendor` | Vendor Management |
| `/learning` | E-learning |
| `/layanan` | Services/Booking |
| `/agents` | AI Agents |
| `/iso-generator` | AI Document Generator |
| `/kpi` | Key Performance Indicators |
| `/dokumen` | Document Management |
| `/proyek` | Project Management |
| `/kalender-kepatuhan` | Compliance Calendar |
| `/kalibrasi` | Calibration Management |
| `/insiden` | Incident Management |
| `/perubahan` | Change Management |
| `/industri` | Industry Solutions |
| `/sertifikasi-badan` | Certification Bodies Directory |

## Key API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/dashboard` | Platform stats |
| `GET /api/v1/risks` | Risk records |
| `GET /api/v1/vendors` | Vendor list |
| `GET /api/audits/internal` | Internal audits |
| `GET /api/audits/external` | External audits |
| `GET /api/certifications` | Certifications |
| `GET /api/iso/facilitators` | Facilitators |
| `POST /api/v1/chat` | Chatbot endpoint |

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/iso-hub run dev` — run frontend locally

## Database Schema (lib/db/src/schema/index.ts)

Tables: `risks`, `vendors`, `facilitators`, `services`, `bookings`, `certifications`, `audits`, `opcTasks`, `knowledgeArticles`, `trainingSessions`, `certificationBodies`, `incidentReports`, `projects`, `documents`

## Components

- `FloatingChatbot` — AI chatbot overlay (uses wouter `useLocation`)
- All pages use `"use client"` pattern with `useState`/`useEffect` for data fetching
