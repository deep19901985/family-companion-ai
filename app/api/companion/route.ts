import { NextResponse } from "next/server";

import {
  createFallbackStructuredResponse,
  validateCompanionRequest
} from "@/lib/ai/companion-schema";
import {
  filterEvidenceByIds,
  getEvidenceForContext
} from "@/lib/ai/evidence-registry";
import { DemoCompanionProvider, OpenAICompanionProvider } from "@/lib/ai/provider";
import { classifySafety, requiresEscalation } from "@/lib/ai/safety";
import type {
  CompanionApiResponse,
  EvidenceRecord,
  StructuredCompanionResponse
} from "@/lib/types";

export const runtime = "nodejs";

function filterAllowedEvidence(
  records: EvidenceRecord[],
  allowedIds: Set<string>
) {
  return records.filter((record) => allowedIds.has(record.id));
}

function normalizeResponseEvidence(
  response: StructuredCompanionResponse,
  context: Parameters<typeof getEvidenceForContext>[0],
  allowedIds: Set<string>
) {
  const evidence = filterAllowedEvidence(
    filterEvidenceByIds(response.evidenceIds, context),
    allowedIds
  );

  return {
    response: {
      ...response,
      evidenceIds: evidence.map((record) => record.id)
    },
    evidence
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const validation = validateCompanionRequest(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const companionRequest = validation.value;
  const safetyClassification = classifySafety(
    companionRequest.userMessage,
    companionRequest.mode
  );
  const contextEvidence = getEvidenceForContext(companionRequest.mode);
  const requestedAllowedIds =
    companionRequest.allowedEvidenceIds ?? companionRequest.evidenceIds;
  const allowedIds = new Set(
    requestedAllowedIds?.length
      ? requestedAllowedIds
      : contextEvidence.map((record) => record.id)
  );
  const evidenceForPrompt = filterAllowedEvidence(contextEvidence, allowedIds);
  const apiKey = process.env.OPENAI_API_KEY;

  if (requiresEscalation(safetyClassification)) {
    const guardedResponse = createFallbackStructuredResponse(
      companionRequest.userMessage,
      companionRequest.mode,
      safetyClassification
    );
    const normalized = normalizeResponseEvidence(
      guardedResponse,
      companionRequest.mode,
      allowedIds
    );

    const payload: CompanionApiResponse = {
      source: "demo-fallback",
      response: normalized.response,
      evidence: normalized.evidence,
      safetyClassification,
      retryable: false
    };

    return NextResponse.json(payload);
  }

  const provider =
    companionRequest.forceDemo || !apiKey
      ? new DemoCompanionProvider()
      : new OpenAICompanionProvider({ apiKey });

  try {
    const generated = await provider.generate({
      request: companionRequest,
      safetyClassification,
      evidence: evidenceForPrompt
    });
    const normalized = normalizeResponseEvidence(
      generated,
      companionRequest.mode,
      allowedIds
    );

    const payload: CompanionApiResponse = {
      source:
        companionRequest.forceDemo || !apiKey ? "demo-fallback" : "live-ai",
      response: normalized.response,
      evidence: normalized.evidence,
      safetyClassification,
      retryable: false
    };

    return NextResponse.json(payload);
  } catch {
    const fallback = createFallbackStructuredResponse(
      companionRequest.userMessage,
      companionRequest.mode,
      safetyClassification
    );
    const normalized = normalizeResponseEvidence(
      fallback,
      companionRequest.mode,
      allowedIds
    );

    const payload: CompanionApiResponse = {
      source: "demo-fallback",
      response: normalized.response,
      evidence: normalized.evidence,
      safetyClassification,
      retryable: true,
      errorMessage:
        "Live AI was unavailable, so the safe deterministic demo fallback responded."
    };

    return NextResponse.json(payload);
  }
}
