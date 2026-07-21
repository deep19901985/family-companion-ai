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
