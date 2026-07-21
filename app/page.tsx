import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  LockKeyhole,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  Sprout,
  Stars,
  UserRoundCheck,
  UsersRound
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
import { roadmap } from "@/lib/mock-data";

const audienceCards = [
  {
    title: "Parent Companion",
    description:
      "A calm place for stress check-ins, reflection prompts, and practical next steps for everyday parenting moments.",
    href: "/parent",
    icon: HeartHandshake
  },
  {
    title: "Child Companion",
    description:
      "Simple language, mood naming, calming activities, and prompts that encourage talking with a trusted adult.",
    href: "/child",
    icon: Sprout
  },
  {
    title: "Family Together",
    description:
      "Shared routines, appreciation prompts, family goals, and gentle check-ins for everyone in the household.",
    href: "/family",
    icon: UsersRound
  }
];

const howItWorks = [
  {
    title: "Listen to the moment",
    detail:
      "Family members name feelings, energy, and needs with prompts designed to feel gentle and clear.",
    icon: MessageCircleHeart
  },
  {
    title: "Turn insight into one step",
    detail:
      "The demo narrows broad advice into a small, practical action that fits today.",
    icon: CalendarCheck
  },
  {
    title: "Notice rhythms over time",
    detail:
      "Parents can explore patterns without labeling, scoring, or diagnosing the family.",
    icon: BookOpenCheck
  }
];

const trustBadges = [
  { label: "Parent oversight", icon: UserRoundCheck },
  { label: "No diagnosis claims", icon: ShieldCheck },
  { label: "Local demo state", icon: LockKeyhole },
  { label: "Evidence-informed language", icon: BrainCircuit }
];

const testimonials = [
  {
    name: "Ava R.",
    role: "Fictional demo parent",
    quote:
      "The product feels like a pause button for the whole household. It makes the next conversation feel possible."
  },
  {
    name: "Samir K.",
    role: "Fictional demo caregiver",
    quote:
      "I like that the child space points back to trusted adults instead of trying to become the trusted adult."
  },
  {
    name: "Nora L.",
    role: "Fictional demo family coach",
    quote:
      "The strongest part is the boundary: supportive prompts, visible safety language, and no inflated claims."
  }
];

export default function Home() {
  return (
    <main>
      <section className="hero-ambient relative isolate overflow-hidden border-b border-white/60">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="page-shell grid min-h-[calc(100svh-4rem)] gap-12 py-14 md:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="animate-fade-up max-w-3xl space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="warm">Family Companion AI</Badge>
              <Badge variant="calm">Support, not replacement care</Badge>
            </div>
            <div className="space-y-5">
              <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-normal text-foreground md:text-7xl">
                Helping families grow,{" "}
                <span className="animated-gradient-text">one conversation</span>{" "}
                at a time.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                A warm AI-guided support space where parents and children can
                check in, practice calmer communication, and build steadier
                routines together.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/onboarding">
                  Start family check-in
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">View demo</Link>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;

                return (
                  <div
                    className="glass-panel flex min-h-16 items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold"
                    key={badge.label}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                    {badge.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[34rem]">
            <FamilyArtwork />
            <div className="glass-panel animate-float absolute bottom-4 left-0 right-0 mx-auto max-w-sm rounded-lg p-4 shadow-premium md:left-auto md:right-4">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles aria-hidden="true" className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">AI companion preview</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Try opening with: What felt hardest today, and what would
                    make the next ten minutes kinder?
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                <span className="rounded-md bg-primary/10 px-2 py-2 text-primary">
                  Reflect
                </span>
                <span className="rounded-md bg-accent/10 px-2 py-2 text-accent">
                  Reframe
                </span>
                <span className="rounded-md bg-secondary/20 px-2 py-2 text-foreground">
                  Repair
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 md:py-20">
        <SectionHeading
          align="center"
          description="Three companion spaces are included in this first milestone, each with clear safety boundaries and parent-visible support."
          eyebrow="MVP surfaces"
          title="Built for the different ways families need support"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {audienceCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card className="interactive-card" key={card.title}>
                <CardHeader>
                  <div className="grid h-14 w-14 place-items-center rounded-lg bg-primary/10 text-primary ring-8 ring-primary/5">
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="soft">
                    <Link href={card.href}>
                      Open demo
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="soft-section border-y border-white/60 py-16 md:py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            description="The best version of this product strengthens human care. It gives families language, structure, and reflection while keeping parents and professionals in the loop."
            eyebrow="Product stance"
            title="AI should support parents, not replace them"
          />
          <div className="grid gap-4">
            {[
              "Parents remain the decision-makers and context holders.",
              "Children are encouraged to speak with trusted adults.",
              "The product avoids diagnosis, crisis promises, and human-like dependency.",
              "Suggestions stay small, transparent, and easy to question."
            ].map((item) => (
              <Card className="interactive-card" key={item}>
                <CardContent className="flex gap-4 pt-6">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-success"
                  />
                  <p className="leading-7 text-muted-foreground">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 md:py-20">
        <SectionHeading
          align="center"
          description="A calm loop for everyday emotional moments, not a maze of settings."
          eyebrow="How it works"
          title="From a hard moment to one kinder next step"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {howItWorks.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card className="interactive-card" key={step.title}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-lg bg-accent/10 p-3 text-accent ring-8 ring-accent/5">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </div>
                    <span className="text-4xl font-semibold text-primary/20">
                      0{index + 1}
                    </span>
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.detail}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="soft-section border-y border-white/60 py-16 md:py-20">
        <div className="page-shell">
          <SectionHeading
            align="center"
            description="Demo quotes are clearly labelled and included to show the intended emotional tone."
            eyebrow="Fictional demo testimonials"
            title="The experience should feel careful, useful, and human-led"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card className="interactive-card" key={testimonial.name}>
                <CardHeader>
                  <Stars aria-hidden="true" className="h-6 w-6 text-warning" />
                  <CardDescription>{testimonial.quote}</CardDescription>
                  <div className="pt-2">
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-6 py-16 md:py-20 lg:grid-cols-2">
        <SafetyNote>
          <p>
            This product is designed to support, not replace, parents,
            caregivers, clinicians, educators, or emergency services. It does not
            provide medical diagnosis, mental-health diagnosis, legal advice, or
            crisis intervention.
          </p>
        </SafetyNote>
        <Card className="interactive-card">
          <CardHeader>
            <Badge variant="calm">Evidence-informed support</Badge>
            <CardTitle>Careful wording without inflated claims</CardTitle>
            <CardDescription>
              The demo uses established themes from child development,
              communication, and routine-building practice as inspiration. It
              avoids claiming that any suggestion is scientifically proven for a
              specific family.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="soft-section border-t border-white/60 py-16 md:py-20">
        <div className="page-shell">
          <SectionHeading
            align="center"
            description="The foundation is intentionally scoped so the product can grow responsibly."
            eyebrow="Feature timeline"
            title="A path toward a complete family operating system"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {roadmap.map((item, index) => (
              <Card className="interactive-card" key={item.stage}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={item.stage === "Today" ? "default" : "neutral"}>
                      {item.stage}
                    </Badge>
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.detail}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FamilyArtwork() {
  return (
    <div
      aria-label="Abstract family support illustration"
      className="glass-panel relative mx-auto min-h-[32rem] max-w-xl overflow-hidden rounded-lg p-6 shadow-premium"
      role="img"
    >
      <div className="absolute left-8 top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute bottom-10 right-8 h-36 w-36 rounded-full bg-secondary/25 blur-2xl" />
      <div className="absolute inset-8 rounded-lg border border-white/70" />
      <div className="relative grid min-h-[28rem] place-items-center">
        <div className="absolute h-80 w-80 rounded-full border border-primary/20" />
        <div className="absolute h-56 w-56 rounded-full border border-accent/25" />
        <div className="absolute h-28 w-28 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-xl" />
        {[
          "left-8 top-20 bg-primary/10 text-primary",
          "right-10 top-24 bg-secondary/20 text-foreground",
          "bottom-20 left-16 bg-accent/10 text-accent",
          "bottom-24 right-16 bg-success/10 text-success"
        ].map((className, index) => (
          <div
            className={`animate-soft-pulse absolute grid h-20 w-20 place-items-center rounded-full border border-white/70 shadow-soft ${className}`}
            key={className}
            style={{ animationDelay: `${index * 220}ms` }}
          >
            <UsersRound aria-hidden="true" className="h-7 w-7" />
          </div>
        ))}
        <div className="glass-panel z-10 max-w-xs rounded-lg p-5 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-primary text-primary-foreground">
            <HeartHandshake aria-hidden="true" className="h-7 w-7" />
          </div>
          <p className="mt-4 text-lg font-semibold">A steadier family rhythm</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Prompts for reflection, repair, and connection stay anchored around
            real family care.
          </p>
        </div>
      </div>
    </div>
  );
}
