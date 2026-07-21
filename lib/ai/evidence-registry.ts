import type { CompanionContext, EvidenceRecord } from "../types";

export const verifiedEvidenceRecords: EvidenceRecord[] = [
  {
    id: "nhs-child-mental-health-support",
    title: "Supporting a child or young person with mental health needs",
    organisation: "NHS",
    sourceUrl:
      "https://www.nhs.uk/mental-health/children-and-young-adults/mental-health-support/supporting-a-child-or-young-person/",
    topic: "Trusted adult and professional support",
    summary:
      "Official NHS guidance encourages parents and carers to seek appropriate support when worried about a child or young person's mental health.",
    evidenceCategory: "established guidance",
    dateAccessed: "2026-07-21",
    lastReviewed: "Not listed on source page; production review required",
    productionVerificationStatus: "Official source metadata verified for demo; clinical interpretation requires review",
    allowedContexts: ["parent", "child", "family", "dashboard"],
    strength: "established guidance"
  },
  {
    id: "nice-ng223-school-wellbeing",
    title: "Social, emotional and mental wellbeing in primary and secondary education",
    organisation: "NICE",
    sourceUrl: "https://www.nice.org.uk/guidance/ng223",
    topic: "School transitions and social-emotional wellbeing",
    summary:
      "NICE guidance covers support for social, emotional and mental wellbeing in education, including school-related transitions.",
    evidenceCategory: "established guidance",
    dateAccessed: "2026-07-21",
    lastReviewed: "2022-07-06",
    productionVerificationStatus: "Official guideline metadata verified for demo; implementation requires professional review",
    allowedContexts: ["parent", "child", "family", "dashboard"],
    strength: "established guidance"
  },
  {
    id: "who-parenting-interventions",
    title:
      "WHO guidelines on parenting interventions to prevent maltreatment and enhance parent-child relationships",
    organisation: "WHO",
    sourceUrl: "https://www.who.int/publications/i/item/9789240065505",
    topic: "Parent-child relationship support",
    summary:
      "WHO guidance addresses parenting interventions intended to strengthen parent-child relationships and reduce harsh parenting.",
    evidenceCategory: "established guidance",
    dateAccessed: "2026-07-21",
    lastReviewed: "2023-02-10",
    productionVerificationStatus: "Official publication metadata verified for demo; product use requires safeguarding review",
    allowedContexts: ["parent", "family", "dashboard"],
    strength: "established guidance"
  },
  {
    id: "unicef-child-distress-signs",
    title: "How to recognize signs of distress in children",
    organisation: "UNICEF",
    sourceUrl:
      "https://www.unicef.org/lac/en/parenting-lac/security-protection/how-recognize-signs-distress-children",
    topic: "Recognising child distress",
    summary:
      "UNICEF describes how children may show distress differently and notes that adults' behaviour can guide children during stress.",
    evidenceCategory: "emerging evidence",
    dateAccessed: "2026-07-21",
    lastReviewed: "Not listed on source page; production review required",
    productionVerificationStatus: "Official source metadata verified for demo; regional applicability requires review",
    allowedContexts: ["parent", "child", "family", "dashboard"],
    strength: "emerging evidence"
  },
  {
    id: "cdc-child-mental-health-treatment",
    title: "Treating children's mental health with therapy",
    organisation: "CDC",
    sourceUrl: "https://www.cdc.gov/children-mental-health/treatment/index.html",
    topic: "Professional involvement and family support",
    summary:
      "CDC guidance describes professional mental-health support for children and notes that parents or caregivers are often involved.",
    evidenceCategory: "established guidance",
    dateAccessed: "2026-07-21",
    lastReviewed: "2026-05-12",
    productionVerificationStatus: "Official source metadata verified for demo; not a substitute for care guidance",
    allowedContexts: ["parent", "family", "dashboard"],
    strength: "established guidance"
  },
  {
    id: "aap-family-routines",
    title: "The importance of family routines",
    organisation: "American Academy of Pediatrics / HealthyChildren.org",
    sourceUrl:
      "https://www.healthychildren.org/English/family-life/family-dynamics/pages/The-Importance-of-Family-Routines.aspx",
    topic: "Family routines",
    summary:
      "AAP parent-facing guidance describes regular, predictable routines as useful for family organization and children's daily rhythm.",
    evidenceCategory: "established guidance",
    dateAccessed: "2026-07-21",
    lastReviewed: "Not listed on source page; production review required",
    productionVerificationStatus: "Official source metadata verified for demo; production review required",
    allowedContexts: ["parent", "family", "dashboard"],
    strength: "established guidance"
  },
  {
    id: "product-transparent-memory",
    title: "Transparent browser-local memory",
    organisation: "Family Companion AI",
    sourceUrl: "Demo reference only",
    topic: "Memory consent",
    summary:
      "The product hypothesis is that visible, editable, browser-local memories are safer than hidden memory for a family demo.",
    evidenceCategory: "product hypothesis",
    dateAccessed: "2026-07-21",
    lastReviewed: "Demo review pending",
    productionVerificationStatus: "Source record to be verified before production",
    allowedContexts: ["parent", "child", "family", "dashboard"],
    placeholderLabel: "Source record to be verified before production",
    strength: "product hypothesis"
  }
];

export function getEvidenceForContext(context: CompanionContext) {
  return verifiedEvidenceRecords.filter((record) =>
    record.allowedContexts.includes(context)
  );
}

export function filterEvidenceByIds(ids: string[], context: CompanionContext) {
  const allowed = getEvidenceForContext(context);
  const requested = new Set(ids);
  return allowed.filter((record) => requested.has(record.id));
}

export function getEvidenceIdsForMessage(message: string, context: CompanionContext) {
  const text = message.toLowerCase();
  const ids = new Set<string>();

  if (text.includes("school") || text.includes("morning") || text.includes("transition")) {
    ids.add("nice-ng223-school-wellbeing");
    ids.add("aap-family-routines");
  }

  if (text.includes("stress") || text.includes("calm") || text.includes("parent")) {
    ids.add("who-parenting-interventions");
    ids.add("unicef-child-distress-signs");
  }

  if (context === "child" || text.includes("unsafe") || text.includes("hurt")) {
    ids.add("nhs-child-mental-health-support");
  }

  if (ids.size === 0) {
    ids.add("nhs-child-mental-health-support");
  }

  return getEvidenceForContext(context)
    .filter((record) => ids.has(record.id))
    .map((record) => record.id);
}
