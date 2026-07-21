import {
  Award,
  CalendarRange,
  CheckCircle2,
  Heart,
  MessageSquareText,
  PartyPopper,
  Sparkles,
  Target,
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
import { goals, routines } from "@/lib/mock-data";

const checkInPrompts = [
  "One thing that felt good today",
  "One thing that felt hard",
  "One thing I need from the family"
];

const calendarPreview = [
  { day: "Mon", event: "Dinner check-in", tone: "bg-primary/10 text-primary" },
  { day: "Tue", event: "School prep", tone: "bg-accent/10 text-accent" },
  { day: "Wed", event: "Walk reset", tone: "bg-success/10 text-success" },
  { day: "Thu", event: "Parent pause", tone: "bg-secondary/20 text-foreground" },
  { day: "Fri", event: "Appreciation", tone: "bg-warning/20 text-foreground" }
];

const appreciationWall = [
  "Mira noticed Leo asking for help before getting upset.",
  "Noah packed lunchboxes before bedtime.",
  "Leo thanked everyone for reading together."
];

export default function FamilyPage() {
  const sharedGoal = goals[0];

  return (
    <main className="page-shell space-y-8 py-10 md:py-14">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <SectionHeading
          description="A shared place for check-ins, appreciation, routines, and low-pressure conversation."
          eyebrow="Family together"
          title="Make one useful family moment easier"
        />
        <Card className="glass-panel">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-primary/10 text-primary">
              <UsersRound aria-hidden="true" className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold">Weekly summary</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Strongest signal: calmer evenings after shared reading and
                appreciation.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="glass-panel">
          <CardHeader>
            <Badge variant="default">Family check-in</Badge>
            <CardTitle>Three quick prompts for everyone</CardTitle>
            <CardDescription>
              Keep answers short and respectful. Passing is allowed.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {checkInPrompts.map((prompt, index) => (
              <div
                className="interactive-card flex min-h-16 items-center gap-4 rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
                key={prompt}
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <p className="font-medium">{prompt}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 via-card to-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target aria-hidden="true" className="h-5 w-5 text-primary" />
              Shared goal
            </CardTitle>
            <CardDescription>{sharedGoal.nextStep}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Progress label={sharedGoal.title} value={sharedGoal.progress} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="soft">
                Choose tonight&apos;s action
              </Button>
              <Button type="button" variant="secondary">
                Review as family
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarRange aria-hidden="true" className="h-5 w-5 text-primary" />
              Family calendar preview
            </CardTitle>
            <CardDescription>
              A lightweight week view for supportive family moments.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-5">
            {calendarPreview.map((item) => (
              <div
                className="interactive-card rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
                key={item.day}
              >
                <p className="text-xs font-semibold text-muted-foreground">
                  {item.day}
                </p>
                <div className={`mt-4 rounded-md px-3 py-2 text-sm font-semibold ${item.tone}`}>
                  {item.event}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award aria-hidden="true" className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>
              Recognition is about effort, repair, and communication.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {["Three check-ins", "Two evening reads", "One repair moment"].map(
              (achievement) => (
                <div
                  className="flex items-center gap-3 rounded-lg border border-white/70 bg-card/75 p-3 shadow-soft"
                  key={achievement}
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-5 w-5 text-success"
                  />
                  <span className="text-sm font-semibold">{achievement}</span>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarRange aria-hidden="true" className="h-5 w-5 text-primary" />
              Routine tracker
            </CardTitle>
            <CardDescription>
              Pick a few repeatable anchors instead of trying to optimize every
              day.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {routines.map((routine, index) => (
              <div
                className="interactive-card rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
                key={routine.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="neutral">{routine.cadence}</Badge>
                  <span className="text-sm font-semibold text-primary">
                    {index === 0 ? "2/5" : index === 1 ? "3/3" : "1/4"}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold">{routine.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {routine.detail}
                </p>
                <div className="mt-4 flex gap-1">
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <span
                      className={
                        dot <= index + 1
                          ? "h-2 flex-1 rounded-full bg-primary"
                          : "h-2 flex-1 rounded-full bg-muted"
                      }
                      key={dot}
                    />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PartyPopper aria-hidden="true" className="h-5 w-5 text-primary" />
              Appreciation wall
            </CardTitle>
            <CardDescription>
              Specific appreciation helps family members feel seen.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {appreciationWall.map((note) => (
              <div
                className="rounded-lg border border-white/70 bg-secondary/10 p-4 text-sm leading-6 shadow-soft"
                key={note}
              >
                {note}
              </div>
            ))}
            <Button type="button">Start appreciation round</Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareText aria-hidden="true" className="h-5 w-5 text-primary" />
              Conversation starter
            </CardTitle>
            <CardDescription>
              What is one tiny change that would make tomorrow morning feel
              kinder for everyone?
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart aria-hidden="true" className="h-5 w-5 text-primary" />
              Connection practice
            </CardTitle>
            <CardDescription>
              Say what you noticed before saying what needs to change.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles aria-hidden="true" className="h-5 w-5 text-primary" />
              Family progress overview
            </CardTitle>
            <CardDescription>
              The demo shows progress as routines and reflections, not as a
              score for the family.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress label="Routine confidence" value={62} />
            <Progress label="Check-in consistency" value={70} />
            <Progress label="Shared goal momentum" value={48} />
          </CardContent>
        </Card>
      </section>

      <Card className="border-primary/25 bg-primary/10">
        <CardContent className="flex gap-4 pt-6">
          <UsersRound aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" />
          <p className="text-sm leading-6 text-muted-foreground">
            Parent oversight remains visible in shared family spaces. This demo
            avoids diagnosis, crisis care, or pretending AI is a human family
            member.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
