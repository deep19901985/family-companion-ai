"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Bot,
  Check,
  ChevronDown,
  Edit3,
  Loader2,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wifi,
  X
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getEvidenceForContext } from "@/lib/ai/evidence-registry";
import { createMemoryFromSuggestion } from "@/lib/ai/memory-consent";
import { requiresEscalation } from "@/lib/ai/safety";
import { getStarterSuggestions } from "@/lib/local-companion";
import { cn } from "@/lib/utils";
import { useDemoMemories } from "@/hooks/use-demo-memories";
import type {
  CompanionApiResponse,
  CompanionContext,
  CompanionMessage,
  EvidenceRecord,
  MemorySuggestion,
  SafetyClassification,
  StructuredCompanionResponse
} from "@/lib/types";

type CompanionPanelProps = {
  context: CompanionContext;
  title?: string;
  prompt?: string;
};

const RESPONSE_STAGES = [
  "Checking safety guardrails",
  "Reviewing allowed source records",
  "Preparing a family-safe next step"
];

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getContextLabel(context: CompanionContext) {
  return {
    dashboard: "Family overview",
    parent: "Parent companion",
    child: "Child companion",
    family: "Shared family space"
  }[context];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCompanionApiResponse(value: unknown): value is CompanionApiResponse {
  if (!isRecord(value) || !isRecord(value.response)) {
    return false;
  }

  return (
    (value.source === "live-ai" || value.source === "demo-fallback") &&
    typeof value.response.acknowledgement === "string" &&
    typeof value.response.practicalNextStep === "string" &&
    typeof value.response.limitationsNote === "string" &&
    Array.isArray(value.evidence) &&
    typeof value.retryable === "boolean"
  );
}

function toLegacySafetyLevel(level: SafetyClassification) {
  return requiresEscalation(level) ? "escalation" : "supportive";
}

function getAssistantContent(response: StructuredCompanionResponse) {
  return `${response.acknowledgement} ${response.practicalNextStep}`;
}

export function CompanionPanel({
  context,
  title = "Family companion chat",
  prompt = "Ask for help turning a family moment into one small next step."
}: CompanionPanelProps) {
  const { memories, addMemory } = useDemoMemories();
  const [messages, setMessages] = useState<CompanionMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [stageIndex, setStageIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryNotice, setRetryNotice] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState(() => getStarterSuggestions(context));
  const [forceDemo, setForceDemo] = useState(false);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const stageTimerRef = useRef<number | null>(null);
  const isDevelopment = process.env.NODE_ENV === "development";

  const allowedEvidenceIds = useMemo(
    () => getEvidenceForContext(context).map((record) => record.id),
    [context]
  );

  const hasEscalation = useMemo(
    () =>
      messages.some(
        (message) =>
          message.safetyLevel === "escalation" ||
          (message.structured && requiresEscalation(message.structured.safetyLevel))
      ),
    [messages]
  );

  useEffect(
    () => () => {
      if (stageTimerRef.current !== null) {
        window.clearInterval(stageTimerRef.current);
      }
    },
    []
  );

  const beginStagedResponse = () => {
    setStageIndex(0);
    stageTimerRef.current = window.setInterval(() => {
      setStageIndex((current) => {
        if (current === null) {
          return 0;
        }

        return Math.min(current + 1, RESPONSE_STAGES.length - 1);
      });
    }, 620);
  };

  const endStagedResponse = () => {
    if (stageTimerRef.current !== null) {
      window.clearInterval(stageTimerRef.current);
      stageTimerRef.current = null;
    }
    setStageIndex(null);
  };

  const sendMessage = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || isTyping) {
      return;
    }

    if (trimmed.toLowerCase().includes("demo error")) {
      setError("The demo response intentionally failed. Reset or try a different prompt.");
      setRetryNotice(null);
      return;
    }

    setError(null);
    setRetryNotice(null);
    setLastPrompt(trimmed);

    const userMessage: CompanionMessage = {
      id: createId("user"),
      role: "user",
      content: trimmed,
      createdAt: "Just now",
      context
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);
    beginStagedResponse();

    try {
      const response = await fetch("/api/companion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode: context,
          pageContext: prompt,
          userMessage: trimmed,
          memories,
          allowedEvidenceIds,
          forceDemo
        })
      });

      const payload = (await response.json()) as unknown;

      if (!response.ok) {
        const message =
          isRecord(payload) && typeof payload.error === "string"
            ? payload.error
            : "The companion request could not be completed.";
        throw new Error(message);
      }

      if (!isCompanionApiResponse(payload)) {
        throw new Error("The companion response did not match the expected shape.");
      }

      const assistantMessage: CompanionMessage = {
        id: createId("assistant"),
        role: "assistant",
        content: getAssistantContent(payload.response),
        createdAt: "Just now",
        context,
        suggestions: payload.response.suggestedReplies,
        safetyLevel: toLegacySafetyLevel(payload.response.safetyLevel),
        structured: payload.response,
        evidence: payload.evidence,
        responseSource: payload.source
      };

      setMessages((current) => [...current, assistantMessage]);
      setSuggestions(payload.response.suggestedReplies);
      setRetryNotice(payload.retryable ? payload.errorMessage ?? null : null);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The companion request could not be completed."
      );
    } finally {
      endStagedResponse();
      setIsTyping(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  const resetDemo = () => {
    setMessages([]);
    setInput("");
    setError(null);
    setRetryNotice(null);
    setIsTyping(false);
    endStagedResponse();
    setSuggestions(getStarterSuggestions(context));
    inputRef.current?.focus();
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="calm">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            AI support, not a human or professional
          </Badge>
          <div className="flex flex-wrap items-center gap-2">
            {isDevelopment ? (
              <div
                aria-label="AI response mode"
                className="flex rounded-lg border border-white/70 bg-card/70 p-1 shadow-soft"
                role="group"
              >
                <button
                  className={cn(
                    "min-h-9 rounded-md px-3 text-xs font-semibold transition-all",
                    !forceDemo
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setForceDemo(false)}
                  type="button"
                >
                  Real AI
                </button>
                <button
                  className={cn(
                    "min-h-9 rounded-md px-3 text-xs font-semibold transition-all",
                    forceDemo
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setForceDemo(true)}
                  type="button"
                >
                  Deterministic demo
                </button>
              </div>
            ) : null}
            <Button onClick={resetDemo} size="sm" type="button" variant="ghost">
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Reset demo
            </Button>
          </div>
        </div>
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bot aria-hidden="true" className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>
            {prompt} Context: {getContextLabel(context)}.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {error ? (
          <InlineNotice
            action={
              lastPrompt ? (
                <Button
                  onClick={() => sendMessage(lastPrompt)}
                  size="sm"
                  type="button"
                  variant="secondary"
                >
                  <RotateCcw aria-hidden="true" className="h-4 w-4" />
                  Retry
                </Button>
              ) : null
            }
            description={error}
            tone="warning"
            title="Companion request error"
          />
        ) : null}

        {retryNotice ? (
          <InlineNotice
            action={
              lastPrompt ? (
                <Button
                  onClick={() => sendMessage(lastPrompt)}
                  size="sm"
                  type="button"
                  variant="secondary"
                >
                  <RotateCcw aria-hidden="true" className="h-4 w-4" />
                  Retry live AI
                </Button>
              ) : null
            }
            description={retryNotice}
            tone="calm"
            title="Demo fallback used"
          />
        ) : null}

        {hasEscalation ? <EscalationNotice /> : null}

        <div
          aria-busy={isTyping}
          aria-live="polite"
          className="max-h-[32rem] space-y-4 overflow-y-auto rounded-lg border border-white/70 bg-card/60 p-4"
        >
          {messages.length === 0 && !isTyping ? (
            <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-primary/25 bg-primary/5 p-6 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-lg bg-primary/10 text-primary">
                <Sparkles aria-hidden="true" className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">No conversation yet</p>
                <p className="max-w-md text-sm leading-6 text-muted-foreground">
                  Try a suggested reply or describe a short family moment. The
                  server will use live AI when configured, otherwise the guided
                  demo fallback responds safely.
                </p>
              </div>
            </div>
          ) : null}

          {messages.map((message) => (
            <MessageRow
              addMemory={addMemory}
              key={message.id}
              message={message}
            />
          ))}

          {isTyping ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Bot aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="flex items-center gap-3 rounded-lg border border-white/70 bg-card px-4 py-3 shadow-soft">
                <Loader2
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin text-primary"
                />
                {stageIndex === null
                  ? "Preparing response"
                  : RESPONSE_STAGES[stageIndex]}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              className="min-h-10 rounded-lg border border-white/70 bg-card/75 px-3 py-2 text-sm font-semibold text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:shadow-focus"
              disabled={isTyping}
              key={suggestion}
              onClick={() => sendMessage(suggestion)}
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor={`${context}-companion-input`}>
            Message the family companion
          </label>
          <input
            className="min-h-12 flex-1 rounded-lg border border-input bg-card/90 px-4 text-sm shadow-soft"
            id={`${context}-companion-input`}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe the family moment..."
            ref={inputRef}
            value={input}
          />
          <Button disabled={isTyping || !input.trim()} type="submit">
            <Send aria-hidden="true" className="h-4 w-4" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function MessageRow({
  message,
  addMemory
}: {
  message: CompanionMessage;
  addMemory: ReturnType<typeof useDemoMemories>["addMemory"];
}) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-3",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {isAssistant ? (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Bot aria-hidden="true" className="h-4 w-4" />
        </span>
      ) : null}
      <div
        className={cn(
          "max-w-[88%] rounded-lg px-4 py-3 text-sm leading-6 shadow-soft",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "border border-white/70 bg-card text-card-foreground"
        )}
      >
        {message.structured ? (
          <StructuredResponse
            addMemory={addMemory}
            evidence={message.evidence ?? []}
            response={message.structured}
            source={message.responseSource ?? "demo-fallback"}
          />
        ) : (
          <p>{message.content}</p>
        )}
        <p
          className={cn(
            "mt-3 text-xs",
            message.role === "user"
              ? "text-primary-foreground/80"
              : "text-muted-foreground"
          )}
        >
          {message.createdAt}
        </p>
      </div>
      {message.role === "user" ? (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
          <UserRound aria-hidden="true" className="h-4 w-4" />
        </span>
      ) : null}
    </div>
  );
}

function StructuredResponse({
  response,
  evidence,
  source,
  addMemory
}: {
  response: StructuredCompanionResponse;
  evidence: EvidenceRecord[];
  source: CompanionApiResponse["source"];
  addMemory: ReturnType<typeof useDemoMemories>["addMemory"];
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={source === "live-ai" ? "success" : "neutral"}>
          <Wifi aria-hidden="true" className="h-3.5 w-3.5" />
          {source === "live-ai" ? "Live AI" : "Demo fallback"}
        </Badge>
        <SafetyBadge level={response.safetyLevel} />
      </div>

      <div className="space-y-3">
        <ResponseSection label="Acknowledgement" value={response.acknowledgement} />
        <ResponseSection label="Possible pattern" value={response.possiblePattern} />
        <ResponseSection
          label="Practical next step"
          value={response.practicalNextStep}
        />
        <ResponseSection
          label="Why this may help"
          value={response.whyThisMayHelp}
        />
      </div>

      <p className="rounded-lg bg-muted/60 p-3 text-xs leading-5 text-muted-foreground">
        {response.limitationsNote}
      </p>

      <SourcesDisclosure evidence={evidence} />

      {response.memorySuggestion ? (
        <MemoryConsentCard
          onRemember={(suggestion, contentOverride) =>
            addMemory(createMemoryFromSuggestion(suggestion, contentOverride))
          }
          suggestion={response.memorySuggestion}
        />
      ) : null}
    </div>
  );
}

function ResponseSection({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-foreground">{value}</p>
    </div>
  );
}

function SafetyBadge({ level }: { level: SafetyClassification }) {
  const label = {
    ordinary: "Ordinary support",
    concerning: "Concerning signal",
    "urgent-safeguarding": "Urgent safeguarding",
    "self-harm-or-immediate-danger": "Immediate danger"
  }[level];

  const variant = requiresEscalation(level)
    ? "warning"
    : level === "concerning"
      ? "warm"
      : "calm";

  return <Badge variant={variant}>{label}</Badge>;
}

function SourcesDisclosure({ evidence }: { evidence: EvidenceRecord[] }) {
  return (
    <details className="rounded-lg border border-white/70 bg-muted/40 p-3">
      <summary className="flex min-h-9 cursor-pointer items-center justify-between gap-3 font-semibold text-primary">
        <span>View sources</span>
        <ChevronDown aria-hidden="true" className="h-4 w-4" />
      </summary>
      <div className="mt-3 space-y-3 text-sm text-muted-foreground">
        {evidence.length === 0 ? (
          <p>No source record was attached to this response.</p>
        ) : (
          evidence.map((record) => (
            <div className="rounded-lg bg-card/80 p-3" key={record.id}>
              <p className="font-semibold text-foreground">{record.title}</p>
              <p>{record.organisation}</p>
              <p className="mt-2">{record.summary}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="neutral">{record.evidenceCategory}</Badge>
                <Badge
                  variant={
                    record.productionVerificationStatus.includes("verified")
                      ? "success"
                      : "warning"
                  }
                >
                  {record.placeholderLabel ?? record.productionVerificationStatus}
                </Badge>
              </div>
              {record.sourceUrl.startsWith("http") ? (
                <a
                  className="mt-2 inline-flex font-semibold text-primary underline-offset-4 hover:underline"
                  href={record.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open source
                </a>
              ) : null}
            </div>
          ))
        )}
      </div>
    </details>
  );
}

function MemoryConsentCard({
  suggestion,
  onRemember
}: {
  suggestion: MemorySuggestion;
  onRemember: (suggestion: MemorySuggestion, contentOverride?: string) => void;
}) {
  const [state, setState] = useState<"open" | "editing" | "remembered" | "dismissed">(
    "open"
  );
  const [draft, setDraft] = useState(suggestion.content);

  if (state === "remembered") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-success/25 bg-success/10 p-3 text-sm font-semibold text-success">
        <Check aria-hidden="true" className="h-4 w-4" />
        Remembered in this browser demo.
      </div>
    );
  }

  if (state === "dismissed") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3 text-sm font-semibold text-muted-foreground">
        <X aria-hidden="true" className="h-4 w-4" />
        Not remembered.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
      <p className="font-semibold">Would you like this remembered in this browser?</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {state === "editing" ? "Edit the memory before saving it." : suggestion.content}
      </p>

      {state === "editing" ? (
        <textarea
          className="mt-3 min-h-24 w-full rounded-lg border border-input bg-card/90 p-3 text-sm shadow-soft"
          onChange={(event) => setDraft(event.target.value)}
          value={draft}
        />
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          disabled={state === "editing" && !draft.trim()}
          onClick={() => {
            onRemember(suggestion, state === "editing" ? draft : undefined);
            setState("remembered");
          }}
          size="sm"
          type="button"
        >
          <Check aria-hidden="true" className="h-4 w-4" />
          {state === "editing" ? "Save memory" : "Remember"}
        </Button>
        {state === "open" ? (
          <Button
            onClick={() => setState("editing")}
            size="sm"
            type="button"
            variant="secondary"
          >
            <Edit3 aria-hidden="true" className="h-4 w-4" />
            Edit before saving
          </Button>
        ) : null}
        <Button
          onClick={() => setState("dismissed")}
          size="sm"
          type="button"
          variant="ghost"
        >
          Do not remember
        </Button>
      </div>
    </div>
  );
}

function InlineNotice({
  title,
  description,
  tone,
  action
}: {
  title: string;
  description: string;
  tone: "warning" | "calm";
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        tone === "warning"
          ? "border-secondary/30 bg-secondary/10"
          : "border-calm/25 bg-calm/10"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-3">
          <AlertTriangle
            aria-hidden="true"
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0",
              tone === "warning" ? "text-secondary" : "text-calm"
            )}
          />
          <div>
            <p className="font-semibold">{title}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        {action}
      </div>
    </div>
  );
}

function EscalationNotice() {
  return (
    <div className="rounded-lg border border-secondary/30 bg-secondary/10 p-5">
      <div className="flex gap-3">
        <AlertTriangle
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
        />
        <div className="space-y-2">
          <p className="font-semibold">Safeguarding placeholder</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Contact a trusted adult now. Emergency help may be needed. This demo
            includes only a placeholder for region-appropriate emergency
            information and would require professional safeguarding review before
            production.
          </p>
          <Button type="button" variant="secondary">
            Talk to a trusted grown-up
          </Button>
        </div>
      </div>
    </div>
  );
}
