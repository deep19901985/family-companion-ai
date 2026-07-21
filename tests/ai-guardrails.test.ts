import assert from "node:assert/strict";
import test from "node:test";

import {
  createFallbackStructuredResponse,
  parseStructuredResponse,
  validateCompanionRequest
} from "../lib/ai/companion-schema";
import {
  filterEvidenceByIds,
  getEvidenceIdsForMessage
} from "../lib/ai/evidence-registry";
import { createMemoryFromSuggestion } from "../lib/ai/memory-consent";
import { classifySafety } from "../lib/ai/safety";
import type { CompanionApiRequest, StructuredCompanionResponse } from "../lib/types";

const validRequest: CompanionApiRequest = {
  mode: "parent",
  pageContext: "Parent page",
  userMessage: "Mornings are stressful before school.",
  memories: [],
  allowedEvidenceIds: ["nice-ng223-school-wellbeing"],
  forceDemo: true
};

test("validates companion requests", () => {
  assert.equal(validateCompanionRequest(validRequest).ok, true);

  const invalid = validateCompanionRequest({
    ...validRequest,
    userMessage: ""
  });

  assert.equal(invalid.ok, false);
});

test("parses structured AI JSON and rejects invalid shapes", () => {
  const response: StructuredCompanionResponse = {
    acknowledgement: "I am AI, not a human.",
    possiblePattern: "This may be a transition moment.",
    practicalNextStep: "Try one calm cue.",
    whyThisMayHelp: "Small steps are easier to review.",
    evidenceIds: ["nice-ng223-school-wellbeing"],
    safetyLevel: "ordinary",
    suggestedReplies: ["Make a plan"],
    memorySuggestion: null,
    limitationsNote: "Not medical, legal, therapy, or emergency advice."
  };

  const parsed = parseStructuredResponse(JSON.stringify(response));

  assert.equal(parsed.ok, true);
  assert.equal(parseStructuredResponse("{").ok, false);
  assert.equal(
    parseStructuredResponse(
      JSON.stringify({
        acknowledgement: "Missing required fields"
      })
    ).ok,
    false
  );
});

test("classifies urgent child safety language", () => {
  assert.equal(
    classifySafety("I want to hurt myself", "child"),
    "self-harm-or-immediate-danger"
  );
  assert.equal(classifySafety("I feel scared and very sad", "child"), "concerning");
  assert.equal(classifySafety("Can we make mornings easier?", "child"), "ordinary");
});

test("filters evidence IDs to the allowed context", () => {
  const childEvidence = filterEvidenceByIds(
    ["who-parenting-interventions", "nice-ng223-school-wellbeing"],
    "child"
  );

  assert.deepEqual(
    childEvidence.map((record) => record.id),
    ["nice-ng223-school-wellbeing"]
  );
});

test("deterministic fallback returns safe structured output", () => {
  const fallback = createFallbackStructuredResponse(
    "Mornings are stressful before school.",
    "parent"
  );

  assert.equal(fallback.safetyLevel, "ordinary");
  assert.ok(fallback.evidenceIds.includes("nice-ng223-school-wellbeing"));
  assert.ok(fallback.memorySuggestion);
});

test("message evidence helper chooses relevant records", () => {
  const ids = getEvidenceIdsForMessage("School mornings feel tense.", "parent");

  assert.ok(ids.includes("nice-ng223-school-wellbeing"));
  assert.ok(ids.includes("aap-family-routines"));
});

test("memory consent creates an editable browser-local memory", () => {
  const fallback = createFallbackStructuredResponse("Please remember the calm cue.", "family");

  assert.ok(fallback.memorySuggestion);

  const memory = createMemoryFromSuggestion(
    fallback.memorySuggestion,
    "Edited memory content"
  );

  assert.equal(memory.content, "Edited memory content");
  assert.equal(memory.relativeTime, "Just now");
});
