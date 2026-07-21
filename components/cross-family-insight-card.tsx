"use client";

import { useState } from "react";
import { BrainCircuit, CheckCircle2, EyeOff, Lightbulb } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { crossFamilyInsight } from "@/lib/milestone2-data";

export function CrossFamilyInsightCard() {
  const [dismissed, setDismissed] = useState(false);
  const [tried, setTried] = useState(false);

  if (dismissed) {
    return (
      <Card className="glass-panel">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <EyeOff aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
            <p className="font-semibold">Possible pattern dismissed for this demo.</p>
          </div>
          <Button onClick={() => setDismissed(false)} type="button" variant="secondary">
            Restore insight
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-panel bg-gradient-to-br from-primary/10 via-card to-secondary/20">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="warning">{crossFamilyInsight.label}</Badge>
          <BrainCircuit aria-hidden="true" className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>{crossFamilyInsight.title}</CardTitle>
        <CardDescription>{crossFamilyInsight.summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft">
          <p className="text-sm font-semibold text-primary">Suggested experiment</p>
          <p className="mt-2 leading-7 text-muted-foreground">
            {crossFamilyInsight.suggestedExperiment}
          </p>
        </div>

        <details className="rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft">
          <summary className="flex min-h-11 cursor-pointer items-center gap-3 font-semibold">
            <Lightbulb aria-hidden="true" className="h-5 w-5 text-primary" />
            Why this insight?
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {crossFamilyInsight.why}
          </p>
        </details>

        <details className="rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft">
          <summary className="min-h-11 cursor-pointer font-semibold">
            Which inputs were used?
          </summary>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {crossFamilyInsight.inputsUsed.map((input) => (
              <li className="flex gap-2" key={input}>
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                />
                {input}
              </li>
            ))}
          </ul>
        </details>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setTried(true)} type="button">
            {tried ? "Activity added to demo" : "Try suggested activity"}
          </Button>
          <Button onClick={() => setDismissed(true)} type="button" variant="secondary">
            Dismiss insight
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
