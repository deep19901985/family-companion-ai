"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, PartyPopper, Play, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDemoMemories } from "@/hooks/use-demo-memories";
import { guidedDemoSteps } from "@/lib/milestone2-data";

const STORAGE_KEY = "family-companion-guided-demo-step";

export function GuidedDemoJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { addMemory } = useDemoMemories();
  const activeStep = guidedDemoSteps[currentStep];
  const complete = currentStep >= guidedDemoSteps.length - 1;
  const progress = Math.round(((currentStep + 1) / guidedDemoSteps.length) * 100);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
    if (Number.isFinite(stored)) {
      setCurrentStep(Math.max(0, Math.min(guidedDemoSteps.length - 1, stored)));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, String(currentStep));
  }, [currentStep, loaded]);

  const advance = () => {
    if (activeStep.memory) {
      addMemory(activeStep.memory);
    }

    setCurrentStep((step) => Math.min(guidedDemoSteps.length - 1, step + 1));
  };

  const reset = () => {
    setCurrentStep(0);
  };

  return (
    <Card className="glass-panel" id="guided-demo">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="warm">Guided demo journey</Badge>
          <Badge variant="neutral">Under 3 minutes</Badge>
        </div>
        <CardTitle>One complete morning-support story</CardTitle>
        <CardDescription>
          Move through a deterministic demo: parent input, child input, possible
          pattern, recommendation, and calm completion.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress label="Guided demo progress" value={progress} />
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <ol className="grid gap-2">
            {guidedDemoSteps.map((step, index) => (
              <li
                className={
                  index <= currentStep
                    ? "flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm font-semibold text-primary"
                    : "flex items-center gap-3 rounded-lg border border-white/70 bg-card/75 p-3 text-sm text-muted-foreground"
                }
                key={step.id}
              >
                {index < currentStep ? (
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-current text-xs">
                    {step.step}
                  </span>
                )}
                {step.title}
              </li>
            ))}
          </ol>

          <div className="rounded-lg border border-white/70 bg-card/75 p-5 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                {complete ? (
                  <PartyPopper aria-hidden="true" className="h-6 w-6" />
                ) : (
                  <Play aria-hidden="true" className="h-6 w-6" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">
                  Step {activeStep.step}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{activeStep.title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {activeStep.description}
                </p>
              </div>
            </div>
            {complete ? (
              <div className="celebration-pop mt-5 rounded-lg border border-success/25 bg-success/10 p-4">
                <p className="font-semibold text-success">Calm celebration</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The family completed one small activity. The demo now has a
                  memory record the family can review or delete.
                </p>
              </div>
            ) : null}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button onClick={advance} type="button">
                {activeStep.actionLabel}
              </Button>
              <Button onClick={reset} type="button" variant="secondary">
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                Restart story
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
