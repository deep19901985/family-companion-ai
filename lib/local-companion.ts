import type {
  CompanionContext,
  CompanionResponse,
  CompanionSafetyLevel
} from "./types";

const escalationKeywords = [
  "i feel unsafe",
  "someone hurt me",
  "hurt myself",
  "want to hurt myself",
  "i want to die",
  "not safe"
];

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function detectSafetyConcern(input: string): boolean {
  return includesAny(input.toLowerCase(), escalationKeywords);
}

export function getStarterSuggestions(context: CompanionContext): string[] {
  if (context === "child") {
    return [
      "Talk to a trusted grown-up",
      "Help me name my feeling",
      "Try a calm breath"
    ];
  }

  if (context === "parent") {
    return [
      "Make a morning plan",
      "Help me calm down first",
      "Explain why this may help"
    ];
  }

  if (context === "family") {
    return [
      "Start a family check-in",
      "Suggest an appreciation prompt",
      "Choose one routine"
    ];
  }

  return [
    "Show today's pattern",
    "Make a morning plan",
    "Explain the suggestion"
  ];
}

export function getLocalCompanionResponse(
  input: string,
  context: CompanionContext
): CompanionResponse {
  const text = input.toLowerCase();
  let safetyLevel: CompanionSafetyLevel = "supportive";

  if (detectSafetyConcern(input)) {
    safetyLevel = "escalation";
    return {
      message: {
        content:
          "I am not a person, therapist, emergency service, or professional. If you feel unsafe or someone hurt you, please tell a trusted grown-up now. Emergency help may be needed. This demo would require professional safeguarding review before production.",
        suggestions: [
          "Talk to a trusted grown-up",
          "Show emergency placeholder",
          "Reset demo"
        ],
        safetyLevel
      },
      suggestions: [
        "Talk to a trusted grown-up",
        "Show emergency placeholder",
        "Reset demo"
      ]
    };
  }

  if (
    includesAny(text, ["morning", "school", "ready", "breakfast", "bag", "leave"])
  ) {
    return {
      message: {
        content:
          "It sounds like the difficult moment is the transition from breakfast to leaving, rather than anyone failing. Would you like to try one calm cue and prepare one item tonight?",
        suggestions: [
          "Make a morning plan",
          "Help me calm down first",
          "Explain why this may help"
        ],
        safetyLevel
      },
      suggestions: [
        "Make a morning plan",
        "Help me calm down first",
        "Explain why this may help"
      ]
    };
  }

  if (includesAny(text, ["calm", "stress", "overwhelmed", "tense"])) {
    return {
      message: {
        content:
          "Before solving the whole problem, try lowering the intensity of the next minute. Take one slow breath, reduce instructions to one sentence, and choose the next visible step.",
        suggestions: [
          "Give me a one-minute reset",
          "Make this child-friendly",
          "Save this as a memory"
        ],
        safetyLevel
      },
      suggestions: [
        "Give me a one-minute reset",
        "Make this child-friendly",
        "Save this as a memory"
      ]
    };
  }

  if (includesAny(text, ["why", "explain", "evidence", "help"])) {
    return {
      message: {
        content:
          "This suggestion uses an evidence-informed principle: small predictable cues can reduce transition load. This demo does not claim proof for your family; it offers a low-risk experiment to review together.",
        suggestions: [
          "Show inputs used",
          "Make it simpler",
          "Try suggested activity"
        ],
        safetyLevel
      },
      suggestions: [
        "Show inputs used",
        "Make it simpler",
        "Try suggested activity"
      ]
    };
  }

  if (context === "child") {
    return {
      message: {
        content:
          "Thanks for naming that. You do not need to handle big feelings alone. Try one calm breath, then tell a trusted grown-up what happened and what you need.",
        suggestions: [
          "Talk to a trusted grown-up",
          "Try a calm breath",
          "Use simple words"
        ],
        safetyLevel
      },
      suggestions: [
        "Talk to a trusted grown-up",
        "Try a calm breath",
        "Use simple words"
      ]
    };
  }

  return {
    message: {
      content:
        "I can help turn this into one small family experiment. Name the hardest moment, choose one calm cue, and decide what the family can prepare before the moment starts.",
      suggestions: [
        "Make a small plan",
        "Add this to memory",
        "Explain why this may help"
      ],
      safetyLevel
    },
    suggestions: [
      "Make a small plan",
      "Add this to memory",
      "Explain why this may help"
    ]
  };
}
