---
name: Expo OIDC browser testing
description: A Replit test-environment limitation when exercising Expo AuthSession against the mock OIDC issuer in a web browser.
---

The automated Replit Auth mock issuer may omit CORS headers on its discovery
document. Expo web then fails before opening login even when the app's native
AuthSession flow and real issuer configuration are correct.

**Why:** A clean Expo login screen and API auth implementation passed targeted
checks, but browser automation failed only after replacing the issuer with the
test mock; the browser explicitly reported a discovery-document CORS rejection.

**How to apply:** For Expo Replit Auth work, still verify the unauthenticated UI
in the browser, but treat mock-issuer discovery CORS as a harness limitation.
Validate server authorization and cross-account isolation independently, and
use a native/deployed smoke test for the complete OIDC round trip.