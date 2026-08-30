import assert from "node:assert/strict";
import {
  boundedRiskScore,
  classifyRisk,
  normalizeRiskStatus,
} from "../lib/api-zod/src/risk";

const boundaries = [
  { probability: 1, impact: 4, level: "low" },
  { probability: 1, impact: 5, level: "medium" },
  { probability: 3, impact: 3, level: "medium" },
  { probability: 2, impact: 5, level: "high" },
  { probability: 3, impact: 5, level: "high" },
  { probability: 4, impact: 4, level: "critical" },
] as const;

for (const boundary of boundaries) {
  assert.equal(
    classifyRisk(boundary.probability, boundary.impact),
    boundary.level,
    `Expected ${boundary.probability}×${boundary.impact} to be ${boundary.level}`,
  );
}

assert.equal(boundedRiskScore(0, 3), 3);
assert.equal(boundedRiskScore(6, 3), 3);
assert.equal(boundedRiskScore(2.5, 3), 3);
assert.equal(boundedRiskScore("5"), 5);

assert.equal(normalizeRiskStatus("Open"), "open");
assert.equal(normalizeRiskStatus("Mitigasi"), "mitigating");
assert.equal(normalizeRiskStatus("mitigating"), "mitigating");
assert.equal(normalizeRiskStatus("Closed"), "closed");
assert.equal(normalizeRiskStatus("unknown", "closed"), "closed");

console.log("Risk boundary and status rules passed.");