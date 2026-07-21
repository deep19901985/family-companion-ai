export type CompanionRole = "parent" | "child" | "family";

export type FamilyMember = {
  id: string;
  name: string;
  role: CompanionRole;
  ageGroup: "adult" | "teen" | "child";
  supportNeeds: string[];
};

export type CheckIn = {
  id: string;
  memberId: string;
  mood: string;
  energy: number;
  stress: number;
  note: string;
  createdAt: string;
};

export type Goal = {
  id: string;
  title: string;
  owner: "parent" | "child" | "family";
  progress: number;
  nextStep: string;
};

export type Activity = {
  id: string;
  title: string;
  audience: CompanionRole;
  duration: string;
  description: string;
  supportArea: string;
};

export type Insight = {
  id: string;
  title: string;
  summary: string;
  signal: "positive" | "watch" | "neutral";
  source: "parent-check-in" | "child-check-in" | "family-routine";
};

export type Routine = {
  id: string;
  title: string;
  cadence: string;
  status: "steady" | "needs-attention" | "new";
  detail: string;
};

export type CompanionContext = "dashboard" | "parent" | "child" | "family";

export type CompanionMessageRole = "user" | "assistant";

export type CompanionSafetyLevel = "supportive" | "escalation";

export type CompanionMessage = {
  id: string;
  role: CompanionMessageRole;
  content: string;
  createdAt: string;
  context: CompanionContext;
  suggestions?: string[];
  safetyLevel?: CompanionSafetyLevel;
  structured?: StructuredCompanionResponse;
  evidence?: EvidenceRecord[];
  responseSource?: CompanionResponseSource;
};

export type CompanionResponse = {
  message: Omit<CompanionMessage, "id" | "createdAt" | "context" | "role"> & {
    content: string;
  };
  suggestions: string[];
};

export type DemoMemoryType =
  | "parent-check-in"
  | "child-mood"
  | "family-challenge"
  | "completed-activity"
  | "selected-goal";

export type DemoMemory = {
  id: string;
  type: DemoMemoryType;
  who: string;
  content: string;
  relativeTime: string;
  relevance: string;
};

export type TimelineEventType =
  | "parent"
  | "child"
  | "family"
  | "suggestion";

export type TimelineEvent = {
  id: string;
  type: TimelineEventType;
  label: string;
  title: string;
  detail: string;
  relativeTime: string;
};

export type CrossFamilyInsight = {
  id: string;
  title: string;
  summary: string;
  suggestedExperiment: string;
  why: string;
  inputsUsed: string[];
  label: string;
};

export type DailyFamilySummary = {
  positiveSignal: string;
  difficultMoment: string;
  possiblePattern: string;
  tomorrowAction: string;
  explanation: string;
};

export type EvidenceStrength =
  | "established guidance"
  | "emerging evidence"
  | "promising evidence"
  | "product hypothesis";

export type EvidenceRecord = {
  id: string;
  title: string;
  organisation: string;
  sourceUrl: string;
  topic: string;
  summary: string;
  evidenceCategory: EvidenceStrength;
  dateAccessed: string;
  lastReviewed: string;
  productionVerificationStatus: string;
  allowedContexts: CompanionContext[];
  placeholderLabel?: string;
  principle?: string;
  explanation?: string;
  sourcePlaceholder?: string;
  organization?: string;
  linkPlaceholder?: string;
  dateReviewed?: string;
  strength: EvidenceStrength;
};

export type GuidedDemoStep = {
  id: string;
  step: number;
  title: string;
  description: string;
  actionLabel: string;
  memory?: DemoMemory;
};

export type SafetyClassification =
  | "ordinary"
  | "concerning"
  | "urgent-safeguarding"
  | "self-harm-or-immediate-danger";

export type CompanionResponseSource = "live-ai" | "demo-fallback";

export type MemorySuggestion = {
  type: DemoMemoryType;
  who: string;
  content: string;
  relevance: string;
};

export type StructuredCompanionResponse = {
  acknowledgement: string;
  possiblePattern: string;
  practicalNextStep: string;
  whyThisMayHelp: string;
  evidenceIds: string[];
  safetyLevel: SafetyClassification;
  suggestedReplies: string[];
  memorySuggestion: MemorySuggestion | null;
  limitationsNote: string;
};

export type CompanionApiRequest = {
  mode: CompanionContext;
  pageContext: string;
  userMessage: string;
  memories: DemoMemory[];
  allowedEvidenceIds?: string[];
  evidenceIds?: string[];
  forceDemo?: boolean;
};

export type CompanionApiResponse = {
  source: CompanionResponseSource;
  response: StructuredCompanionResponse;
  evidence: EvidenceRecord[];
  safetyClassification: SafetyClassification;
  retryable: boolean;
  errorMessage?: string;
};
