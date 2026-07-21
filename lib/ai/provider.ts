import { companionJsonSchema, createFallbackStructuredResponse, parseStructuredResponse } from "./companion-schema";
import type {
  CompanionApiRequest,
  EvidenceRecord,
  SafetyClassification,
  StructuredCompanionResponse
} from "../types";

const DEFAULT_MODEL = "gpt-5.6-sol";
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_TIMEOUT_MS = 12000;

type ProviderInput = {
  request: CompanionApiRequest;
  safetyClassification: SafetyClassification;
  evidence: EvidenceRecord[];
};

export type AiCompanionProvider = {
  generate(input: ProviderInput): Promise<StructuredCompanionResponse>;
};

type ResponsesContentItem = {
  type?: string;
  text?: string;
};

type ResponsesOutputItem = {
  content?: ResponsesContentItem[];
};

type ResponsesApiResult = {
  output_text?: string;
  output?: ResponsesOutputItem[];
};

function extractOutputText(value: ResponsesApiResult) {
  if (typeof value.output_text === "string" && value.output_text.trim()) {
    return value.output_text;
  }

  return (
    value.output
      ?.flatMap((item) => item.content ?? [])
      .map((item) => item.text)
      .filter((text): text is string => typeof text === "string")
      .join("\n")
      .trim() ?? ""
  );
}

function buildSystemPrompt() {
  return [
    "You are Family Companion AI, an AI assistant, not a human, parent, clinician, therapist, lawyer, or emergency service.",
    "Support families with practical, proportionate next steps. Do not diagnose, give medical advice, legal advice, crisis counseling, or certainty claims.",
    "Never ask a child to keep secrets. Encourage trusted adults and qualified professionals when support may be needed.",
    "Avoid dependency-forming language. Do not imply the user needs you, that you are always available, or that you can replace real relationships.",
    "Use only the evidence records supplied in the request. Return evidenceIds only from the supplied records. Do not invent source claims, statistics, quotes, or citations.",
    "For urgent safeguarding, self-harm, or immediate danger, stop normal coaching and direct the user toward a trusted adult and local emergency support placeholders.",
    "Return only JSON matching the provided schema."
  ].join("\n");
}

function buildUserPrompt({
  request,
  safetyClassification,
  evidence
}: ProviderInput) {
  return JSON.stringify({
    mode: request.mode,
    pageContext: request.pageContext,
    userMessage: request.userMessage,
    recentLocalMemories: request.memories.slice(0, 8),
    allowedEvidenceRecords: evidence.map((record) => ({
      id: record.id,
      title: record.title,
      organisation: record.organisation,
      topic: record.topic,
      summary: record.summary,
      evidenceCategory: record.evidenceCategory,
      productionVerificationStatus: record.productionVerificationStatus
    })),
    safetyClassification
  });
}

export class DemoCompanionProvider implements AiCompanionProvider {
  async generate({
    request,
    safetyClassification
  }: ProviderInput): Promise<StructuredCompanionResponse> {
    return createFallbackStructuredResponse(
      request.userMessage,
      request.mode,
      safetyClassification
    );
  }
}

export class OpenAICompanionProvider implements AiCompanionProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly timeoutMs: number;

  constructor({
    apiKey,
    model = process.env.OPENAI_MODEL || DEFAULT_MODEL,
    timeoutMs = DEFAULT_TIMEOUT_MS
  }: {
    apiKey: string;
    model?: string;
    timeoutMs?: number;
  }) {
    this.apiKey = apiKey;
    this.model = model;
    this.timeoutMs = timeoutMs;
  }

  async generate(input: ProviderInput): Promise<StructuredCompanionResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(OPENAI_RESPONSES_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: this.model,
          input: [
            {
              role: "system",
              content: buildSystemPrompt()
            },
            {
              role: "user",
              content: buildUserPrompt(input)
            }
          ],
          text: {
            format: {
              type: "json_schema",
              name: "family_companion_response",
              schema: companionJsonSchema,
              strict: true
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error("Live AI request failed.");
      }

      const data = (await response.json()) as ResponsesApiResult;
      const outputText = extractOutputText(data);
      const parsed = parseStructuredResponse(outputText);

      if (!parsed.ok) {
        throw new Error(parsed.error);
      }

      return parsed.value;
    } finally {
      clearTimeout(timeout);
    }
  }
}
