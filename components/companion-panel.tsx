"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Bot,
  RotateCcw,
  Send,
  ShieldCheck,
  UserRound
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
import { EmptyState, ErrorState } from "@/components/ui/state";
import { getLocalCompanionResponse, getStarterSuggestions } from "@/lib/local-companion";
import { cn } from "@/lib/utils";
import type { CompanionContext, CompanionMessage } from "@/lib/types";

type CompanionPanelProps = {
  context: CompanionContext;
  title?: string;
  prompt?: string;
};

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

export function CompanionPanel({
  context,
  title = "Family companion chat",
  prompt = "Ask for help turning a family moment into one small next step."
}: CompanionPanelProps) {
  const [messages, setMessages] = useState<CompanionMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState(() => getStarterSuggestions(context));
  const inputRef = useRef<HTMLInputElement>(null);

  const hasEscalation = useMemo(
    () => messages.some((message) => message.safetyLevel === "escalation"),
    [messages]
  );

  const sendMessage = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || isTyping) {
      return;
    }

    if (trimmed.toLowerCase().includes("demo error")) {
      setError("The local demo response intentionally failed. Reset or try a different prompt.");
      return;
    }

    setError(null);
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

    window.setTimeout(() => {
      const response = getLocalCompanionResponse(trimmed, context);
      const assistantMessage: CompanionMessage = {
        id: createId("assistant"),
        role: "assistant",
        content: response.message.content,
        createdAt: "Just now",
        context,
        suggestions: response.suggestions,
        safetyLevel: response.message.safetyLevel
      };

      setMessages((current) => [...current, assistantMessage]);
      setSuggestions(response.suggestions);
      setIsTyping(false);
    }, 650);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  const resetDemo = () => {
    setMessages([]);
    setInput("");
    setError(null);
    setIsTyping(false);
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
          <Button onClick={resetDemo} size="sm" type="button" variant="ghost">
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Reset demo
          </Button>
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
          <ErrorState description={error} title="Local response error" />
        ) : null}

        {hasEscalation ? <EscalationNotice /> : null}

        <div
          aria-live="polite"
          className="max-h-[28rem] space-y-3 overflow-y-auto rounded-lg border border-white/70 bg-card/60 p-4"
        >
          {messages.length === 0 && !isTyping ? (
            <EmptyState
              description="Try a suggested reply or type a short family moment. The response is generated locally and deterministically."
              title="No conversation yet"
            />
          ) : null}

          {messages.map((message) => (
            <div
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
              key={message.id}
            >
              {message.role === "assistant" ? (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Bot aria-hidden="true" className="h-4 w-4" />
                </span>
              ) : null}
              <div
                className={cn(
                  "max-w-[84%] rounded-lg px-4 py-3 text-sm leading-6 shadow-soft",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-white/70 bg-card text-card-foreground"
                )}
              >
                <p>{message.content}</p>
                <p
                  className={cn(
                    "mt-2 text-xs",
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
          ))}

          {isTyping ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Bot aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="rounded-lg border border-white/70 bg-card px-4 py-3 shadow-soft">
                Companion is typing...
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
            Message the local family companion
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

function EscalationNotice() {
  return (
    <div className="rounded-lg border border-secondary/30 bg-secondary/10 p-5">
      <div className="flex gap-3">
        <AlertTriangle
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
        />
        <div className="space-y-2">
          <p className="font-semibold">Mock safeguarding escalation</p>
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
