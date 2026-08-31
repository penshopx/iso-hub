---
name: Expo push delivery concurrency
description: Reliability boundary for scheduled Expo push sends across multiple API instances.
---

Serialize the complete find/claim/send cycle with a distributed database lock, and fence every retryable delivery claim with a unique ownership ID. Bound external requests with a timeout.

**Why:** A local overlap guard cannot stop multiple API instances, and a stale lease can be reclaimed while the original worker is still waiting on Expo. Fencing protects database state, while the distributed lock prevents two live workers from submitting the same alert concurrently.

**How to apply:** Any future scheduled external notification job must acquire the shared database lock before reading candidates and hold it until all provider responses are processed. Sent/release updates must include the claim ownership ID.