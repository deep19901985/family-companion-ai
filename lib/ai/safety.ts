import type { CompanionContext, SafetyClassification } from "../types";

const selfHarmKeywords = [
  "hurt myself",
  "want to hurt myself",
  "kill myself",
  "want to die",
  "suicide",
  "end my life"
];

const urgentSafeguardingKeywords = [
  "i feel unsafe",
  "someone hurt me",
  "not safe at home",
  "being hurt",
  "abuse",
  "touched me"
];

const concerningKeywords = [
  "scared",
  "afraid",
  "panic",
  "hopeless",
  "can't cope",
  "cannot cope",
  "very sad"
];

function includesAny(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}

export function classifySafety(
  message: string,
  mode: CompanionContext
): SafetyClassification {
  const text = message.toLowerCase();

  if (includesAny(text, selfHarmKeywords)) {
    return "self-harm-or-immediate-danger";
  }

  if (includesAny(text, urgentSafeguardingKeywords)) {
    return "urgent-safeguarding";
  }

  if (mode === "child" && includesAny(text, concerningKeywords)) {
    return "concerning";
  }

  return "ordinary";
}

export function requiresEscalation(classification: SafetyClassification) {
  return (
    classification === "urgent-safeguarding" ||
    classification === "self-harm-or-immediate-danger"
  );
}
