---
name: Composite DB declarations
description: Prevent stale composite TypeScript declarations from producing false missing-export errors after database schema changes.
---

After database schema exports change, rebuild the composite database TypeScript project before using downstream API typecheck results.

**Why:** The API can resolve stale declaration output from the referenced database project and report that newly exported schema members do not exist, even though the source exports are correct and the runtime bundle succeeds.

**How to apply:** During release audits that follow database-schema merges, build the database project references first, then run the API typecheck. Treat missing-export errors as real only if they remain after declaration output is refreshed.