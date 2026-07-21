"use client";

import { useMemo, useState } from "react";
import {
  Award,
  CheckCircle2,
  Cloud,
  MessageCircle,
  Moon,
  ShieldCheck,
  Smile,
  Star,
  SunMedium,
  Wind
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

const moods = [
  {
    label: "Okay",
    icon: Smile,
    gradient: "from-primary/10 to-calm/10",
    prompt: "A steady day still deserves a little check-in."
  },
  {
    label: "Bright",
    icon: SunMedium,
    gradient: "from-warning/20 to-secondary/20",
    prompt: "Nice. Notice what helped today feel lighter."
  },
  {
    label: "Quiet",
    icon: Moon,
    gradient: "from-accent/10 to-primary/10",
    prompt: "Quiet can mean many things. Go slowly."
  },
  {
    label: "Stormy",
    icon: Cloud,
    gradient: "from-calm/20 to-secondary/20",
    prompt: "Big feelings can be named one small word at a time."
  }
];

const happenedChoices = [
  "Something at school",
  "A friend moment",
  "A change in plans",
  "A family moment",
  "I am not sure yet"
];

export default function ChildPage() {
  const [mood, setMood] = useState("Okay");
  const [happened, setHappened] = useState("I am not sure yet");
  const [didActivity, setDidActivity] = useState(false);

  const selectedMood = moods.find((item) => item.label === mood) ?? moods[0];

  const progress = useMemo(() => {
    let value = 35;
    if (mood) value += 20;
    if (happened) value += 20;
    if (didActivity) value += 25;
    return Math.min(value, 100);
  }, [didActivity, happened, mood]);

  return (
    <main className="page-shell space-y-8 py-10 md:py-14">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <SectionHeading
          description="Simple choices, steady language, and a clear bridge to trusted adults."
          eyebrow="Child companion"
          title="Let&apos;s check in with how today feels"
        />
        <Card className="glass-panel">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck aria-hidden="true" className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold">Grown-up connection stays visible</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                This space helps with words and calm practice. It is not a secret
                place.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Pick a mood word</CardTitle>
            <CardDescription>
              There is no wrong answer. This just helps choose what might help
              next.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {moods.map((item) => {
              const Icon = item.icon;
              const selected = mood === item.label;

              return (
                <button
                  className={
                    selected
                      ? `celebration-pop interactive-card min-h-32 rounded-lg border border-primary bg-gradient-to-br ${item.gradient} p-4 text-left shadow-premium`
                      : `interactive-card min-h-32 rounded-lg border border-white/70 bg-gradient-to-br ${item.gradient} p-4 text-left shadow-soft`
                  }
                  key={item.label}
                  onClick={() => setMood(item.label)}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-card/80 text-primary shadow-soft">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    {selected ? (
                      <CheckCircle2
                        aria-hidden="true"
                        className="h-5 w-5 text-success"
                      />
                    ) : null}
                  </div>
                  <span className="mt-5 block text-lg font-semibold">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    {item.prompt}
                  </span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge variant="warm">What happened?</Badge>
              <div
                aria-live="polite"
                className="celebration-pop rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
                key={mood}
              >
                {selectedMood.label} selected
              </div>
            </div>
            <CardTitle>Choose the closest one</CardTitle>
            <CardDescription>
              You can keep it short. A trusted adult can help with the rest.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {happenedChoices.map((choice) => (
              <button
                className={
                  happened === choice
                    ? "interactive-card min-h-12 rounded-lg border border-accent bg-accent/10 px-4 py-3 text-left text-sm font-semibold text-accent shadow-soft"
                    : "interactive-card min-h-12 rounded-lg border border-white/70 bg-card/75 px-4 py-3 text-left text-sm font-medium hover:bg-white"
                }
                key={choice}
                onClick={() => setHappened(choice)}
                type="button"
              >
                {choice}
              </button>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Badge variant="calm">Calming activity</Badge>
            <CardTitle>Try a four-count hand breath</CardTitle>
            <CardDescription>
              Breathe in for four. Breathe out for four. Try five gentle rounds.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="relative grid min-h-64 place-items-center overflow-hidden rounded-lg border border-white/70 bg-gradient-to-br from-primary/10 via-card to-accent/10">
              <div className="absolute h-44 w-44 rounded-full border border-primary/20" />
              <div className="absolute h-64 w-64 rounded-full border border-accent/20" />
              <div className="breathing-orb grid h-28 w-28 place-items-center rounded-full bg-primary text-primary-foreground shadow-premium">
                <Wind aria-hidden="true" className="h-10 w-10" />
              </div>
              <div className="absolute bottom-5 flex gap-2">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-primary/30"
                    key={dot}
                  />
                ))}
              </div>
            </div>
            <Button
              onClick={() => setDidActivity(true)}
              type="button"
              variant={didActivity ? "soft" : "default"}
            >
              {didActivity ? "Activity tried" : "I tried it"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="interactive-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle aria-hidden="true" className="h-5 w-5 text-primary" />
                Words to use with an adult
              </CardTitle>
              <CardDescription>
                Try: &quot;I feel {mood.toLowerCase()} because of{" "}
                {happened.toLowerCase()}. Can you help me think about what to do
                next?&quot;
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="interactive-card bg-gradient-to-br from-warning/20 via-card to-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award aria-hidden="true" className="h-5 w-5 text-primary" />
                Progress reward
              </CardTitle>
              <CardDescription>
                Small steps count. You named a feeling and chose a next action.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                {["Mood", "Story", "Calm"].map((label, index) => (
                  <div
                    className={
                      progress >= 55 + index * 20
                        ? "celebration-pop rounded-lg border border-warning/25 bg-warning/20 p-3 text-center"
                        : "rounded-lg border border-white/70 bg-card/75 p-3 text-center"
                    }
                    key={label}
                  >
                    <Star
                      aria-hidden="true"
                      className="mx-auto h-5 w-5 text-warning"
                    />
                    <p className="mt-2 text-xs font-semibold">{label}</p>
                  </div>
                ))}
              </div>
              <Progress label="Check-in progress" value={progress} />
            </CardContent>
          </Card>
        </div>
      </section>

      <SafetyNote>
        <p>
          This child space helps with words and calming practice. It is not a
          person, therapist, doctor, emergency service, or secret place. A parent
          or trusted adult should help when something feels too big or unsafe.
        </p>
      </SafetyNote>
    </main>
  );
}
