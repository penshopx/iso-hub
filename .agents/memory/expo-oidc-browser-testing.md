---
name: Expo OIDC browser testing
description: A Replit test-environment limitation when exercising Expo AuthSession against the mock OIDC issuer in a web browser.
---

The automated Replit Auth mock issuer may omit CORS headers on its discovery
document. Expo web then fails before opening login even when the app's native
AuthSession flow and real issuer configuration are correct.

The test harness's server-side `ISSUER_URL` override does not automatically
replace an Expo client's public issuer setting. If the Expo bundle still points
to Replit's real issuer, injected test claims will not be used and the normal
provider-selection popup appears.

**Why:** A clean Expo login screen and API auth implementation passed targeted
checks, but browser automation failed only after replacing the issuer with the
test mock; the browser explicitly reported a discovery-document CORS rejection.

**How to apply:** For Expo Replit Auth work, still verify the unauthenticated UI
in the browser. A full browser login test requires both server and Expo client
to use the test issuer; if that issuer then fails discovery CORS, treat it as a
harness limitation. Validate server authorization and cross-account isolation
independently, and use a native/deployed smoke test for the complete OIDC round
trip.