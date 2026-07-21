import { getLocalCompanionResponse } from "../local-companion";
import type {
  CompanionApiRequest,
  CompanionContext,
  DemoMemory,
  DemoMemoryType,
  MemorySuggestion,
  SafetyClassification,
  StructuredCompanionResponse
} from "../types";
import { getEvidenceIdsForMessage } from "./evidence-registry";
import { classifySafety } from "./safety";

const contexts: CompanionContext[] = ["dashboard", "parent", "child", "family"];
const memoryTypes: DemoMemoryType[] = [
  "parent-check-in",
  "child-mood",
  "family-challenge",
  "completed-activity",
  "selected-goal"
];
const safetyLevels: SafetyClassification[] = [
  "ordinary",
  "concerning",
  "urgent-safeguarding",
  "self-harm-or-immediate-danger"
];

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validateMemory(value: unknown): value is DemoMemory {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    memoryTypes.includes(value.type as DemoMemoryType) &&
    typeof value.who === "string" &&
    typeof value.content === "string" &&
    typeof value.relativeTime === "string" &&
    typeof value.relevance === "string"
  );
}

function validateMemorySuggestion(value: unknown): MemorySuggestion | null | false {
  if (value === null) {
    return null;
  }

  if (!isRecord(value)) {
    return false;
  }

  if (
    memoryTypes.includes(value.type as DemoMemoryType) &&
    typeof value.who === "string" &&
    typeof value.content === "string" &&
    typeof value.relevance === "string"
  ) {
    return {
      type: value.type as DemoMemoryType,
      who: value.who,
      content: value.content,
      relevance: value.relevance
    };
  }

  return false;
}

export function validateCompanionRequest(
  value: unknown
): ValidationResult<CompanionApiRequest> {
  if (!isRecord(value)) {
    return { ok: false, error: "Request body must be an object." };
  }

  if (!contexts.includes(value.mode as CompanionContext)) {
    return { ok: false, error: "Invalid companion mode." };
  }

  if (typeof value.pageContext !== "string" || value.pageContext.length > 1200) {
    return { ok: false, error: "Invalid page context." };
  }

  if (
    typeof value.userMessage !== "string" ||
    value.userMessage.trim().length < 1 ||
    value.userMessage.length > 2000
  ) {
    return { ok: false, error: "Invalid user message." };
  }

  if (!Array.isArray(value.memories) || !value.memories.every(validateMemory)) {
    return { ok: false, error: "Invalid memories." };
  }

  if (
    value.allowedEvidenceIds !== undefined &&
    !isStringArray(value.allowedEvidenceIds)
  ) {
    return { ok: false, error: "Invalid allowed evidence IDs." };
  }

  if (value.evidenceIds !== undefined && !isStringArray(value.evidenceIds)) {
    return { ok: false, error: "Invalid evidence IDs." };
  }

  if (value.forceDemo !== undefined && typeof value.forceDemo !== "boolean") {
    return { ok: false, error: "Invalid demo toggle." };
  }

  return {
    ok: true,
    value: {
      mode: value.mode as CompanionContext,
      pageContext: value.pageContext,
      userMessage: value.userMessage,
      memories: value.memories,
      allowedEvidenceIds: value.allowedEvidenceIds,
      evidenceIds: value.evidenceIds,
      forceDemo: value.forceDemo
    }
  };
}

export function validateStructuredResponse(
  value: unknown
): ValidationResult<StructuredCompanionResponse> {
  if (!isRecord(value)) {
    return { ok: false, error: "AI response must be an object." };
  }

  const memorySuggestion = validateMemorySuggestion(value.memorySuggestion);
  if (memorySuggestion === false) {
    return { ok: false, error: "Invalid memory suggestion." };
  }

  if (
    typeof value.acknowledgement !== "string" ||
    typeof value.possiblePattern !== "string" ||
    typeof value.practicalNextStep !== "string" ||
    typeof value.whyThisMayHelp !== "string" ||
    !isStringArray(value.evidenceIds) ||
    !safetyLevels.includes(value.safetyLevel as SafetyClassification) ||
    !isStringArray(value.suggestedReplies) ||
    typeof value.limitationsNote !== "string"
  ) {
    return { ok: false, error: "AI response did not match the expected shape." };
  }

  return {
    ok: true,
    value: {
      acknowledgement: value.acknowledgement,
      possiblePattern: value.possiblePattern,
      practicalNextStep: value.practicalNextStep,
      whyThisMayHelp: value.whyThisMayHelp,
      evidenceIds: value.evidenceIds,
      safetyLevel: value.safetyLevel as SafetyClassification,
      suggestedReplies: value.suggestedReplies.slice(0, 4),
      memorySuggestion,
      limitationsNote: value.limitationsNote
    }
  };
}

export function parseStructuredResponse(
  raw: string
): ValidationResult<StructuredCompanionResponse> {
  try {
    return validateStructuredResponse(JSON.parse(raw));
  } catch {
    return { ok: false, error: "AI response was not valid JSON." };
  }
}

export function createFallbackStructuredResponse(
  userMessage: string,
  context: CompanionContext,
  safetyLevel = classifySafety(userMessage, context)
): StructuredCompanionResponse {
  const local = getLocalCompanionResponse(userMessage, context);
  const evidenceIds = getEvidenceIdsForMessage(userMessage, context);

  if (
    safetyLevel === "urgent-safeguarding" ||
    safetyLevel === "self-harm-or-immediate-danger"
  ) {
    return {
      acknowledgement:
        "I am AI, not a human or emergency service. This sounds like a moment for immediate human support.",
      possiblePattern:
        "The message may involve safety, harm, or immediate danger, so normal coaching is not appropriate.",
      practicalNextStep:
        "Tell a trusted adult now. Emergency help may be needed. Use local emergency services if there is immediate danger.",
      whyThisMayHelp:
        "Urgent safety concerns need human help, not an AI conversation.",
      evidenceIds: ["nhs-child-mental-health-support"],
      safetyLevel,
      suggestedReplies: [
        "Talk to a trusted grown-up",
        "Show emergency placeholder",
        "Reset demo"
      ],
      memorySuggestion: null,
      limitationsNote:
        "Production use requires professional safeguarding review and region-appropriate emergency guidance."
    };
  }

  return {
    acknowledgement:
      "I am AI, not a human or professional. I can help shape this into a small, reviewable next step.",
    possiblePattern: local.message.content,
    practicalNextStep:
      context === "child"
        ? "Use one simple feeling word, try one slow breath, and talk to a trusted grown-up."
        : "Try one calm cue and prepare one item before the difficult moment begins.",
    whyThisMayHelp:
      "A small predictable action can lower decision load without treating the pattern as certain or diagnostic.",
    evidenceIds,
    safetyLevel,
    suggestedReplies: local.suggestions.slice(0, 4),
    memorySuggestion: {
      type:
        context === "child"
          ? "child-mood"
          : context === "parent"
            ? "parent-check-in"
            : "family-challenge",
      who:
        context === "child" ? "Child" : context === "parent" ? "Parent" : "Family",
      content: userMessage.slice(0, 180),
      relevance:
        "This may help the browser-local demo connect future suggestions to the family context you chose to save."
    },
    limitationsNote:
      "This is supportive, evidence-informed guidance only. It is not diagnosis, therapy, legal advice, medical advice, or emergency support."
  };
}

export const companionJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "acknowledgement",
    "possiblePattern",
    "practicalNextStep",
    "whyThisMayHelp",
    "evidenceIds",
    "safetyLevel",
    "suggestedReplies",
    "memorySuggestion",
    "limitationsNote"
  ],
  properties: {
    acknowledgement: { type: "string" },
    possiblePattern: { type: "string" },
    practicalNextStep: { type: "string" },
    whyThisMayHelp: { type: "string" },
    evidenceIds: { type: "array", items: { type: "string" } },
    safetyLevel: {
      type: "string",
      enum: safetyLevels
    },
    suggestedReplies: { type: "array", items: { type: "string" } },
    memorySuggestion: {
      anyOf: [
        { type: "null" },
        {
          type: "object",
          additionalProperties: false,
          required: ["type", "who", "content", "relevance"],
          properties: {
            type: { type: "string", enum: memoryTypes },
            who: { type: "string" },
            content: { type: "string" },
            relevance: { type: "string" }
          }
        }
      ]
    },
    limitationsNote: { type: "string" }
  }
} as const;
