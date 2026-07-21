import type { Activity, CheckIn, FamilyMember, Goal, Insight, Routine } from "@/lib/types";

export const familyMembers: FamilyMember[] = [
  {
    id: "mira",
    name: "Mira",
    role: "parent",
    ageGroup: "adult",
    supportNeeds: ["calmer mornings", "more connected evenings"]
  },
  {
    id: "leo",
    name: "Leo",
    role: "child",
    ageGroup: "child",
    supportNeeds: ["big feelings", "school transitions"]
  },
  {
    id: "noah",
    name: "Noah",
    role: "parent",
    ageGroup: "adult",
    supportNeeds: ["shared routines", "co-parenting rhythm"]
  }
];

export const recentCheckIns: CheckIn[] = [
  {
    id: "checkin-1",
    memberId: "mira",
    mood: "stretched but hopeful",
    energy: 58,
    stress: 64,
    note: "Mornings felt rushed, but bedtime reading helped everyone reset.",
    createdAt: "Today"
  },
  {
    id: "checkin-2",
    memberId: "leo",
    mood: "proud",
    energy: 72,
    stress: 32,
    note: "Used a breathing pause before asking for help with homework.",
    createdAt: "Yesterday"
  }
];

export const suggestedActivity: Activity = {
  id: "activity-1",
  title: "Ten-minute reset walk",
  audience: "family",
  duration: "10 min",
  description:
    "Step outside together and let each person name one thing they noticed, one thing they need, and one kind thing from the day.",
  supportArea: "Connection"
};

export const routines: Routine[] = [
  {
    id: "routine-1",
    title: "School morning launch",
    cadence: "Weekdays",
    status: "needs-attention",
    detail: "Prep bags after dinner and choose one calm cue before leaving."
  },
  {
    id: "routine-2",
    title: "Dinner check-in",
    cadence: "Mon, Wed, Fri",
    status: "steady",
    detail: "One high, one hard thing, one helper for tomorrow."
  },
  {
    id: "routine-3",
    title: "Screen wind-down",
    cadence: "Evenings",
    status: "new",
    detail: "Try a shared charging spot and a five-minute plan for tomorrow."
  }
];

export const goals: Goal[] = [
  {
    id: "goal-1",
    title: "Make school mornings feel less rushed",
    owner: "family",
    progress: 62,
    nextStep: "Agree on one bag-packing time tonight."
  },
  {
    id: "goal-2",
    title: "Help Leo name feelings before they overflow",
    owner: "child",
    progress: 48,
    nextStep: "Practice the color mood scale after snack."
  },
  {
    id: "goal-3",
    title: "Protect one parent reset window",
    owner: "parent",
    progress: 35,
    nextStep: "Choose a 15-minute quiet slot for Thursday."
  }
];

export const insights: Insight[] = [
  {
    id: "insight-1",
    title: "Evening reading is a reliable regulation cue",
    summary:
      "Three recent notes mention calmer connection after short shared reading. Keep it lightweight and predictable.",
    signal: "positive",
    source: "family-routine"
  },
  {
    id: "insight-2",
    title: "Morning friction clusters around transitions",
    summary:
      "Check-ins suggest the hardest moments happen between breakfast and leaving. A visible checklist may help.",
    signal: "watch",
    source: "parent-check-in"
  },
  {
    id: "insight-3",
    title: "Child confidence increased after asking for help",
    summary:
      "Leo reported feeling proud after using words to ask for support, which is a useful skill to reinforce.",
    signal: "neutral",
    source: "child-check-in"
  }
];

export const supportAreas = [
  "Emotional check-ins",
  "Routines",
  "School transitions",
  "Parent stress",
  "Family communication",
  "Co-parenting rhythm"
];

export const roadmap = [
  {
    stage: "Today",
    title: "Parent and Child Companion",
    detail: "Guided check-ins, calm prompts, routine support, and visible parent oversight."
  },
  {
    stage: "Next",
    title: "Couple Support",
    detail: "Shared reflection tools and communication scaffolds for adults, without replacing counseling."
  },
  {
    stage: "Future",
    title: "Family Operating System",
    detail: "Planning, routines, goals, insights, and support spaces woven into one family rhythm."
  }
];
