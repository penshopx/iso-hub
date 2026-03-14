# Active Context: ISO Management System

## Current State

**Project Status**: ✅ Building ISO Management System

A Next.js application for managing ISO certifications (ISO 45001 K3, ISO 14001 Lingkungan), audits, and training (BIMTEK).

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] ISO Management System dashboard with navigation
- [x] ISO 45001 (K3) page
- [x] ISO 14001 (Lingkungan) page
- [x] Pelatihan/BIMTEK page
- [x] Audit Internal page
- [x] Audit Eksternal page
- [x] ISO Generator page

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

ISO Management System - Building out core features:
- Dashboard with navigation to all modules
- ISO 45001 (K3) management
- ISO 14001 (Lingkungan) management
- Pelatihan BIMTEK
- Audit Internal & Eksternal
- ISO Document Generator

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-03-14 | Cloud fork session, built ISO Management System with 6 main modules |
