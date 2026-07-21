"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HeartHandshake,
  PartyPopper,
  Plus,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  UsersRound
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
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
import { supportAreas } from "@/lib/mock-data";

const steps = [
  "Welcome",
  "Family goals",
  "Add family members",
  "Support areas",
  "Privacy and consent",
  "Complete"
];

const familyGoals = [
  "Build calmer routines",
  "Understand big feelings",
  "Improve family communication",
  "Support parent wellbeing"
];

const encouragement = [
  "A gentle start is still a start.",
  "Choose the goals that would actually help this week.",
  "Nicknames are perfect for this local demo.",
  "A smaller support area is easier to practice well.",
  "Clear consent makes the product feel safer.",
  "Ready for a first family rhythm."
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([familyGoals[0]]);
  const [members, setMembers] = useState(["Mira", "Leo"]);
  const [newMember, setNewMember] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    "Emotional check-ins",
    "Routines"
  ]);
  const [consent, setConsent] = useState(false);

  const progress = useMemo(
    () => Math.round(((step + 1) / steps.length) * 100),
    [step]
  );

  const toggle = (
    value: string,
    selected: string[],
    setSelected: (next: string[]) => void
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  const addMember = () => {
    const trimmed = newMember.trim();
    if (!trimmed) {
      return;
    }
    setMembers([...members, trimmed]);
    setNewMember("");
  };

  const canContinue = step !== 4 || consent;

  return (
    <main className="page-shell py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="space-y-6">
          <SectionHeading
            description="A short, local-only setup that helps the demo feel personal without storing real family data."
            eyebrow="Family onboarding"
            title="Create a calm starting point"
          />
          <Card className="glass-panel">
            <CardContent className="space-y-6 pt-6">
              <Progress label="Setup progress" value={progress} />
              <div className="relative overflow-hidden rounded-lg border border-white/70 bg-gradient-to-br from-primary/10 via-card to-secondary/20 p-5">
                <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-white/60 blur-xl" />
                <div className="relative flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft">
                    <HeartHandshake aria-hidden="true" className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      Friendly nudge
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {encouragement[step]}
                    </p>
                  </div>
                </div>
              </div>
              <ol className="grid gap-2">
                {steps.map((label, index) => (
                  <li className="flex items-center gap-3 text-sm" key={label}>
                    <span
                      className={
                        index <= step
                          ? "grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground shadow-soft transition-all"
                          : "grid h-8 w-8 place-items-center rounded-md border border-border bg-card/80 text-muted-foreground transition-all"
                      }
                    >
                      {index < step ? (
                        <Check aria-hidden="true" className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span
                      className={
                        index === step
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </aside>

        <Card className="glass-panel animate-fade-up">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge variant="warm">{steps[step]}</Badge>
              <Badge variant="neutral">Step {step + 1} of {steps.length}</Badge>
            </div>
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <CardTitle className="text-2xl">{getStepTitle(step)}</CardTitle>
                <CardDescription>{getStepDescription(step)}</CardDescription>
              </div>
              <StepIllustration step={step} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="animate-fade-up" key={step}>
              {step === 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Parent-guided", icon: ShieldCheck },
                    { label: "Child-safe language", icon: UsersRound },
                    { label: "Local demo only", icon: Sparkles }
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        className="interactive-card rounded-lg border border-white/70 bg-card/75 p-4 text-sm font-medium shadow-soft"
                        key={item.label}
                      >
                        <Icon aria-hidden="true" className="mb-4 h-6 w-6 text-primary" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {familyGoals.map((goal) => (
                    <button
                      className={
                        selectedGoals.includes(goal)
                          ? "interactive-card min-h-16 rounded-lg border border-primary bg-primary/10 px-4 py-3 text-left text-sm font-semibold text-primary shadow-soft"
                          : "interactive-card min-h-16 rounded-lg border border-white/70 bg-card/75 px-4 py-3 text-left text-sm font-medium text-foreground shadow-soft hover:bg-white"
                      }
                      key={goal}
                      onClick={() => toggle(goal, selectedGoals, setSelectedGoals)}
                      type="button"
                    >
                      <Target aria-hidden="true" className="mb-3 h-5 w-5" />
                      {goal}
                    </button>
                  ))}
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label className="sr-only" htmlFor="member-name">
                      Family member name
                    </label>
                    <input
                      className="min-h-12 flex-1 rounded-lg border border-input bg-card/90 px-4 text-sm shadow-soft"
                      id="member-name"
                      onChange={(event) => setNewMember(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addMember();
                        }
                      }}
                      placeholder="Add a family member"
                      value={newMember}
                    />
                    <Button onClick={addMember} type="button">
                      <Plus aria-hidden="true" className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {members.map((member, index) => (
                      <div
                        className="interactive-card flex min-h-16 items-center gap-3 rounded-lg border border-white/70 bg-card/75 px-4 shadow-soft"
                        key={member}
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                          <UserRound aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <div>
                          <span className="font-semibold">{member}</span>
                          <p className="text-xs text-muted-foreground">
                            Demo member {index + 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {supportAreas.map((area) => (
                    <button
                      className={
                        selectedAreas.includes(area)
                          ? "interactive-card min-h-16 rounded-lg border border-accent bg-accent/10 px-4 py-3 text-left text-sm font-semibold text-accent shadow-soft"
                          : "interactive-card min-h-16 rounded-lg border border-white/70 bg-card/75 px-4 py-3 text-left text-sm font-medium text-foreground shadow-soft hover:bg-white"
                      }
                      key={area}
                      onClick={() => toggle(area, selectedAreas, setSelectedAreas)}
                      type="button"
                    >
                      <Sparkles aria-hidden="true" className="mb-3 h-5 w-5" />
                      {area}
                    </button>
                  ))}
                </div>
              ) : null}

              {step === 4 ? (
                <label className="interactive-card flex cursor-pointer gap-4 rounded-lg border border-white/70 bg-card/75 p-5 shadow-soft">
                  <input
                    checked={consent}
                    className="mt-1 h-5 w-5 accent-primary"
                    onChange={(event) => setConsent(event.target.checked)}
                    type="checkbox"
                  />
                  <span className="space-y-2">
                    <span className="block font-semibold">
                      I understand this is a supportive demo with parent
                      oversight.
                    </span>
                    <span className="block text-sm leading-6 text-muted-foreground">
                      This app does not provide diagnosis, emergency support,
                      professional care, legal advice, or private cloud storage
                      in this milestone.
                    </span>
                  </span>
                </label>
              ) : null}

              {step === 5 ? (
                <div className="celebration-pop space-y-6 rounded-lg border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-secondary/20 p-6 shadow-premium">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="grid h-16 w-16 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft">
                      <PartyPopper aria-hidden="true" className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">
                        Your demo family space is ready.
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        You created enough context to explore a first supportive
                        rhythm.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 text-sm md:grid-cols-3">
                    <Stat value={members.length} label="members added" />
                    <Stat value={selectedGoals.length} label="goals selected" />
                    <Stat value={selectedAreas.length} label="support areas" />
                  </div>
                  <Button asChild>
                    <Link href="/dashboard">Open dashboard</Link>
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
              <Button
                disabled={step === 0}
                onClick={() => setStep(Math.max(0, step - 1))}
                type="button"
                variant="secondary"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Back
              </Button>
              <Button
                disabled={step === steps.length - 1 || !canContinue}
                onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                type="button"
              >
                Continue
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function StepIllustration({ step }: { step: number }) {
  const icons = [HeartHandshake, Target, UsersRound, Sparkles, ShieldCheck, PartyPopper];
  const Icon = icons[step] ?? HeartHandshake;

  return (
    <div className="relative hidden h-28 w-28 place-items-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/20 md:grid">
      <div className="absolute h-16 w-16 rounded-full border border-primary/20" />
      <div className="grid h-14 w-14 place-items-center rounded-lg bg-card text-primary shadow-soft">
        <Icon aria-hidden="true" className="h-7 w-7" />
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg border border-white/70 bg-card/75 p-4">
      <p className="text-2xl font-semibold text-primary">{value}</p>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

function getStepTitle(step: number) {
  return [
    "Welcome to your family setup",
    "Choose what you want to strengthen",
    "Add the people in this demo family",
    "Pick support areas",
    "Confirm privacy and consent boundaries",
    "Ready for the dashboard"
  ][step];
}

function getStepDescription(step: number) {
  return [
    "This first milestone uses local, temporary demo state only.",
    "Select the goals that feel most useful for the next few weeks.",
    "Use first names or nicknames for the demo.",
    "These areas shape the prompts shown across the product demo.",
    "Safeguarding, transparency, and parent oversight are part of the product surface.",
    "You can now explore the demo dashboard and companion spaces."
  ][step];
}
