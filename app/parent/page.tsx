"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Battery,
  BookMarked,
  Brain,
  CalendarCheck,
  ChevronDown,
  Cloud,
  Flame,
  HeartPulse,
  ListChecks,
  Moon,
  PenLine,
  Smile,
  SunMedium,
  Zap
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { SafetyNote } from "@/components/safety-note";
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

const feelings = [
  { label: "Calm", icon: SunMedium },
  { label: "Stretched", icon: Zap },
  { label: "Worried", icon: Cloud },
  { label: "Hopeful", icon: Smile },
  { label: "Tired", icon: Moon }
];

const evidenceCards = [
  {
    title: "Co-regulation before instruction",
    detail:
      "A calmer adult nervous system can make it easier for a child to hear one clear request. This is framed as a practical idea, not a clinical claim."
  },
  {
    title: "Small predictable routines",
    detail:
      "Repeated cues can reduce decision load during transitions. The demo keeps recommendations modest and testable."
  }
];

export default function ParentPage() {
  const [feeling, setFeeling] = useState("Stretched");
  const [stress, setStress] = useState(62);
  const [energy, setEnergy] = useState(44);
  const [challenge, setChallenge] = useState(
    "Mornings feel rushed and everyone gets tense before school."
  );

  const practicalStep = useMemo(() => {
    if (stress > 70) {
      return "Pause the problem-solving for two minutes, lower the pace, and pick only the next visible task.";
    }
    if (energy < 40) {
      return "Choose one low-effort support: prepare bags tonight or ask another adult to own one morning task.";
    }
    return "Name the pattern, agree on one calm cue, and test it for the next two mornings.";
  }, [energy, stress]);

  const balanceScore = Math.max(12, Math.min(100, Math.round((energy + (100 - stress)) / 2)));

  return (
    <main className="page-shell space-y-8 py-10 md:py-14">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <SectionHeading
          description="A polished parent companion surface for reflection, regulation, and one practical next step."
          eyebrow="Parent companion"
          title="How are you feeling today?"
        />
        <Card className="glass-panel">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-secondary/20 text-foreground">
              <Flame aria-hidden="true" className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Progress streak
              </p>
              <p className="text-2xl font-semibold">4 calm check-ins</p>
              <p className="text-sm text-muted-foreground">
                Demo streak for regular reflection.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Parent check-in</CardTitle>
            <CardDescription>
              Name the moment without needing to fix everything at once.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-7">
            <div className="space-y-3">
              <p className="text-sm font-semibold">Feeling</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {feelings.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      className={
                        feeling === item.label
                          ? "interactive-card min-h-16 rounded-lg border border-primary bg-primary/10 px-4 py-3 text-left text-sm font-semibold text-primary shadow-soft"
                          : "interactive-card min-h-16 rounded-lg border border-white/70 bg-card/75 px-4 py-3 text-left text-sm font-medium hover:bg-white"
                      }
                      key={item.label}
                      onClick={() => setFeeling(item.label)}
                      type="button"
                    >
                      <Icon aria-hidden="true" className="mb-2 h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5 rounded-lg border border-white/70 bg-card/70 p-5 shadow-soft">
              <Slider
                icon={HeartPulse}
                label="Stress"
                maxLabel="High"
                minLabel="Low"
                onChange={setStress}
                value={stress}
              />
              <Slider
                icon={Battery}
                label="Energy"
                maxLabel="Full"
                minLabel="Low"
                onChange={setEnergy}
                value={energy}
              />
              <Progress label="Regulation readiness" value={balanceScore} />
            </div>

            <label className="space-y-2">
              <span className="block text-sm font-semibold">
                Current parenting challenge
              </span>
              <textarea
                className="min-h-32 w-full rounded-lg border border-input bg-card/90 p-4 text-sm leading-6 shadow-soft"
                onChange={(event) => setChallenge(event.target.value)}
                value={challenge}
              />
            </label>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/10 via-card to-accent/10">
            <CardHeader>
              <Badge variant="calm">Suggested response framework</Badge>
              <CardTitle>Regulate, name, choose</CardTitle>
              <CardDescription>
                This is a supportive scaffold, not a diagnosis or professional
                assessment.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Regulate first",
                  detail:
                    "Lower the volume, slow your body, and reduce the number of instructions.",
                  icon: HeartPulse
                },
                {
                  title: "Name the pattern",
                  detail:
                    "Use neutral words: mornings are feeling rushed, not anyone is failing.",
                  icon: Brain
                },
                {
                  title: "Choose one step",
                  detail: "Pick a single next action that can happen today.",
                  icon: ListChecks
                }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className="interactive-card rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
                    key={item.title}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="interactive-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenLine aria-hidden="true" className="h-5 w-5 text-primary" />
                  Daily reflection
                </CardTitle>
                <CardDescription>
                  You selected {feeling.toLowerCase()} with stress at {stress} and
                  energy at {energy}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  Try asking: what would make this moment 10 percent easier for
                  me and for my child?
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card">
              <CardHeader>
                <CardTitle>Practical next step</CardTitle>
                <CardDescription>{practicalStep}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="rounded-lg border border-white/70 bg-muted/40 p-3 text-sm leading-6 text-muted-foreground">
                  Based on: {challenge.trim() || "the current challenge you named"}
                </p>
                <Button type="button" variant="soft">
                  Save as demo next step
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookMarked aria-hidden="true" className="h-5 w-5 text-primary" />
              Evidence placeholders
            </CardTitle>
            <CardDescription>
              Expandable cards show how future versions could explain sources
              and reasoning without overstating certainty.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {evidenceCards.map((card) => (
              <details
                className="rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
                key={card.title}
              >
                <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-semibold">
                  {card.title}
                  <ChevronDown aria-hidden="true" className="h-5 w-5 text-primary" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {card.detail}
                </p>
              </details>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck aria-hidden="true" className="h-5 w-5 text-primary" />
              Why this suggestion?
            </CardTitle>
            <CardDescription>
              The framework prioritizes reducing immediate intensity before
              adding instructions. It reflects common evidence-informed
              parenting themes: co-regulation, clear language, and small
              predictable next steps.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <SafetyNote />
    </main>
  );
}

function Slider({
  label,
  value,
  onChange,
  minLabel,
  maxLabel,
  icon: Icon
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
  icon: LucideIcon;
}) {
  return (
    <label className="block space-y-3">
      <span className="flex items-center justify-between gap-3 text-sm">
        <span className="flex items-center gap-2 font-semibold">
          <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
          {label}
        </span>
        <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
          {value}/100
        </span>
      </span>
      <input
        aria-label={label}
        className="premium-range w-full"
        max={100}
        min={0}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        value={value}
      />
      <span className="flex justify-between text-xs text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </span>
    </label>
  );
}
