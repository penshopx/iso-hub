---
name: ISO Hub route validation
description: Runtime requirements for standalone ISO Hub route checks.
---

Standalone ISO Hub preview checks must provide both `PORT` and `BASE_PATH` because the Vite config rejects either missing value. Preview processes should run in a detached process group and be terminated as a group after checks complete.

**Why:** The app's managed workflow injects these variables automatically, but an independent validation command does not; omitting them causes a false check failure or leaves a child preview process running.

**How to apply:** Set `PORT` and `BASE_PATH=/` for an isolated build/preview check, use a dedicated port, and terminate the full preview process group in cleanup.