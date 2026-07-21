import type {
  CrossFamilyInsight,
  DailyFamilySummary,
  DemoMemory,
  EvidenceRecord,
  GuidedDemoStep,
  TimelineEvent
} from "@/lib/types";

export const initialDemoMemories: DemoMemory[] = [
  {
    id: "memory-parent-morning",
    type: "parent-check-in",
    who: "Mira",
    content: "Mornings feel rushed before school.",
    relativeTime: "Today",
    relevance:
      "May connect to school transitions and the family's morning routine goal."
  },
  {
    id: "memory-child-school",
    type: "child-mood",
    who: "Leo",
    content: "School felt difficult yesterday.",
    relativeTime: "Yesterday",
    relevance:
      "May help explain why getting ready for school feels more sensitive."
  },
  {
    id: "memory-family-bag",
    type: "selected-goal",
    who: "Family",
    content: "Make school mornings feel less rushed.",
    relativeTime: "This week",
    relevance:
      "Selected goal gives the companion permission to suggest routine experiments."
  }
];

export const demoTimelineEvents: TimelineEvent[] = [
  {
    id: "timeline-parent-1",
    type: "parent",
    label: "Parent",
    title: "Parent check-in: rushed mornings",
    detail: "Mira noted that the hardest moment happens before leaving for school.",
    relativeTime: "Today, 8:10 AM"
  },
  {
    id: "timeline-child-1",
    type: "child",
    label: "Child",
    title: "Child mood: school felt difficult",
    detail: "Leo chose a quieter mood and named school as the closest reason.",
    relativeTime: "Yesterday, 4:05 PM"
  },
  {
    id: "timeline-suggestion-1",
    type: "suggestion",
    label: "Suggestion",
    title: "AI suggestion: pack one item tonight",
    detail:
      "The local companion suggested preparing one school item together before bedtime.",
    relativeTime: "Today, 8:18 AM"
  },
  {
    id: "timeline-family-1",
    type: "family",
    label: "Family",
    title: "Family activity: evening reading helped",
    detail: "The family reported calmer connection after a short shared reading.",
    relativeTime: "Yesterday, 7:40 PM"
  },
  {
    id: "timeline-family-2",
    type: "family",
    label: "Family",
    title: "Completed goal step: appreciation round",
    detail: "Each person named one specific thing they appreciated.",
    relativeTime: "Two days ago"
  }
];

export const crossFamilyInsight: CrossFamilyInsight = {
  id: "insight-school-transition",
  label: "Possible pattern, not a diagnosis",
  title: "School mornings may be the shared pressure point",
  summary:
    "Yesterday the child check-in mentioned that school felt difficult. Today the parent check-in mentioned rushed mornings. These may be connected through the transition before school.",
  suggestedExperiment:
    "Pack the school bag together tonight and use one calm cue tomorrow morning.",
  why:
    "The two inputs both point toward school transition pressure. The recommendation stays small so the family can test it without treating it as a conclusion.",
  inputsUsed: [
    "Child mood: school felt difficult",
    "Parent check-in: mornings feel rushed",
    "Selected family goal: calmer school mornings"
  ]
};

export const dailyFamilySummary: DailyFamilySummary = {
  positiveSignal:
    "Your family showed good connection during the evening reading activity.",
  difficultMoment:
    "Stress appeared highest around preparing for school and leaving the house.",
  possiblePattern:
    "The pressure may be less about behavior and more about transition load.",
  tomorrowAction:
    "Try packing one school item together before bedtime and agree on one calm cue.",
  explanation:
    "This was suggested because recent demo inputs connect school difficulty, rushed mornings, and a goal to make transitions kinder."
};

export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "demo-transition-cues",
    title: "Predictable transition cues",
    organisation: "Family Companion AI",
    sourceUrl: "Demo reference only",
    topic: "Transition support",
    summary:
      "Clear, repeated cues can make everyday transitions easier to understand. This demo uses the principle to suggest one small routine experiment.",
    evidenceCategory: "product hypothesis",
    dateAccessed: "2026-07-21",
    lastReviewed: "Demo review pending",
    productionVerificationStatus: "Source record to be verified before production",
    allowedContexts: ["dashboard", "parent", "child", "family"],
    placeholderLabel: "Source record to be verified before production",
    principle: "Predictable transition cues",
    explanation:
      "Clear, repeated cues can make everyday transitions easier to understand. This demo uses the principle to suggest one small routine experiment.",
    sourcePlaceholder: "Source record to be verified before production",
    organization: "Demo reference only",
    linkPlaceholder: "Link placeholder",
    dateReviewed: "Demo review pending",
    strength: "product hypothesis"
  },
  {
    id: "demo-coregulation",
    title: "Adult regulation before problem-solving",
    organisation: "Family Companion AI",
    sourceUrl: "Demo reference only",
    topic: "Co-regulation",
    summary:
      "When a caregiving adult slows the moment first, the next instruction can feel easier to hear. This is framed as supportive guidance, not treatment.",
    evidenceCategory: "product hypothesis",
    dateAccessed: "2026-07-21",
    lastReviewed: "Demo review pending",
    productionVerificationStatus: "Source record to be verified before production",
    allowedContexts: ["dashboard", "parent", "family"],
    placeholderLabel: "Source record to be verified before production",
    principle: "Adult regulation before problem-solving",
    explanation:
      "When a caregiving adult slows the moment first, the next instruction can feel easier to hear. This is framed as supportive guidance, not treatment.",
    sourcePlaceholder: "Source record to be verified before production",
    organization: "Demo reference only",
    linkPlaceholder: "Link placeholder",
    dateReviewed: "Demo review pending",
    strength: "product hypothesis"
  },
  {
    id: "demo-family-memory",
    title: "Transparent family memory",
    organisation: "Family Companion AI",
    sourceUrl: "Demo reference only",
    topic: "Memory consent",
    summary:
      "Showing what the demo remembers lets families review, delete, and question context instead of assuming hidden memory.",
    evidenceCategory: "product hypothesis",
    dateAccessed: "2026-07-21",
    lastReviewed: "Demo review pending",
    productionVerificationStatus: "Source record to be verified before production",
    allowedContexts: ["dashboard", "parent", "child", "family"],
    placeholderLabel: "Source record to be verified before production",
    principle: "Transparent family memory",
    explanation:
      "Showing what the demo remembers lets families review, delete, and question context instead of assuming hidden memory.",
    sourcePlaceholder: "Demo reference only",
    organization: "Product hypothesis",
    linkPlaceholder: "Link placeholder",
    dateReviewed: "Demo review pending",
    strength: "product hypothesis"
  }
];

export const guidedDemoSteps: GuidedDemoStep[] = [
  {
    id: "guided-parent",
    step: 1,
    title: "Parent records rushed mornings",
    description:
      "Mira shares that mornings feel rushed and tense before school.",
    actionLabel: "Record parent check-in",
    memory: {
      id: "guided-memory-parent",
      type: "parent-check-in",
      who: "Mira",
      content: "Mornings feel rushed and tense before school.",
      relativeTime: "Just now",
      relevance:
        "This gives the companion context about the parent's hardest moment."
    }
  },
  {
    id: "guided-child",
    step: 2,
    title: "Child records school difficulty",
    description:
      "Leo chooses a quieter mood and says school feels difficult.",
    actionLabel: "Record child mood",
    memory: {
      id: "guided-memory-child",
      type: "child-mood",
      who: "Leo",
      content: "School feels difficult today.",
      relativeTime: "Just now",
      relevance:
        "This may connect the child's mood to the morning transition."
    }
  },
  {
    id: "guided-insight",
    step: 3,
    title: "Dashboard finds a possible pattern",
    description:
      "The dashboard connects rushed mornings with school feeling difficult.",
    actionLabel: "View possible pattern"
  },
  {
    id: "guided-recommendation",
    step: 4,
    title: "Companion suggests a small experiment",
    description:
      "Pack the school bag together tonight and choose one calm cue for tomorrow.",
    actionLabel: "Try suggestion",
    memory: {
      id: "guided-memory-suggestion",
      type: "family-challenge",
      who: "Family",
      content: "Try packing the school bag together tonight.",
      relativeTime: "Just now",
      relevance:
        "This connects the possible pattern to one practical next step."
    }
  },
  {
    id: "guided-complete",
    step: 5,
    title: "Family marks the activity complete",
    description:
      "The family completes the evening bag-packing experiment and receives a calm celebration.",
    actionLabel: "Mark complete",
    memory: {
      id: "guided-memory-complete",
      type: "completed-activity",
      who: "Family",
      content: "Packed the school bag together before bedtime.",
      relativeTime: "Just now",
      relevance:
        "Completed activities help the demo show what worked for the family."
    }
  }
];
