import assert from "node:assert/strict";
import {
  canCloseFinding,
  normalizeFindingStatus,
} from "../artifacts/api-server/src/lib/qmsPolicy";

assert.equal(normalizeFindingStatus("CLOSED"), "closed");
assert.equal(normalizeFindingStatus("arbitrary"), "open");

assert.equal(canCloseFinding([]), false);
assert.equal(
  canCloseFinding([
    {
      status: "pending",
      evidence: null,
      effectivenessCheck: null,
      effectivenessStatus: "pending",
    },
  ]),
  false,
);
assert.equal(
  canCloseFinding([
    {
      status: "completed",
      evidence: "Foto implementasi",
      effectivenessCheck: "Diverifikasi ulang",
      effectivenessStatus: "pending",
    },
  ]),
  false,
);
assert.equal(
  canCloseFinding([
    {
      status: "completed",
      evidence: "Foto implementasi",
      effectivenessCheck: "Diverifikasi ulang",
      effectivenessStatus: "verified",
    },
  ]),
  true,
);

console.log("QMS document and CAPA closure policies passed.");