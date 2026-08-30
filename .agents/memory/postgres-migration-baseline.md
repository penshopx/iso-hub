---
name: Postgres migration baseline
description: How schema changes reach production for this existing ISO Hub database.
---

Do not generate or run a custom production migration from the current Drizzle schema. Keep the schema source current, push it to development, and let Replit Publish calculate and apply the development-to-production schema diff.

**Why:** The project already has a populated PostgreSQL schema but no Drizzle migration snapshot history. A generated initial migration conflicts with existing tables, while deploy/startup DDL bypasses Replit's supported production schema flow.

**How to apply:** Update Drizzle schema source, apply it to development through the existing push/post-merge flow, verify on non-empty data, then publish so Replit surfaces and applies the production diff.