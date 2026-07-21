import Link from "next/link";
import {
  Activity,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Compass,
  HeartPulse,
  LayoutDashboard,
  Lightbulb,
  MessageSquareHeart,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Target,
  UsersRound
} from "lucide-react";

import { CompanionPanel } from "@/components/companion-panel";
import { CrossFamilyInsightCard } from "@/components/cross-family-insight-card";
import { DailyFamilySummaryCard } from "@/components/daily-family-summary-card";
import { EvidenceDrawer } from "@/components/evidence-drawer";
import { FamilyTimeline } from "@/components/family-timeline";
import { GuidedDemoJourney } from "@/components/guided-demo-journey";
import { MemoryPanel } from "@/components/memory-panel";
import { MetricCard } from "@/components/metric-card";
import { SafetyNote } from "@/components/safety-note";
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
import { EmptyState } from "@/components/ui/state";
import { Progress } from "@/components/ui/progress";
import {
  goals,
  insights,
  recentCheckIns,
  routines,
  suggestedActivity
} from "@/lib/mock-data";

const sidebarItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/parent", label: "Parent", icon: HeartPulse },
  { href: "/child", label: "Child", icon: SmilePlus },
  { href: "/family", label: "Family", icon: UsersRound }
];

const activityWidgets = [
  {
    title: "Calm cue",
    detail: "Pick one phrase for leaving the house.",
    icon: Compass
  },
  {
    title: "Reflection",
    detail: "Two-minute parent note after dinner.",
    icon: BookOpenCheck
  },
  {
    title: "Connection",
    detail: "One high, one hard, one helper.",
    icon: MessageSquareHeart
  }
];

export default function DashboardPage() {
  return (
    <main className="page-shell py-10 md:py-14">
      <div className="grid gap-6 lg:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">
          <div className="glass-panel sticky top-24 rounded-lg p-3">
            <div className="px-3 py-4">
              <p className="text-sm font-semibold">Family workspace</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Demo household: Mira, Noah, Leo
              </p>
            </div>
            <nav aria-label="Dashboard navigation" className="grid gap-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition-all hover:bg-white/75 hover:text-foreground"
                    href={item.href}
                    key={item.href}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/10 p-3">
              <ShieldCheck aria-hidden="true" className="h-5 w-5 text-primary" />
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Supportive demo only. Parent oversight stays visible.
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-10">
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <SectionHeading
              description="A premium demo dashboard for daily rhythms, supportive signals, and one practical next action."
              eyebrow="Family dashboard"
              title="Good afternoon, Mira. Your family has a steady place to start."
            />
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button asChild>
                <Link href="/parent">
                  <HeartPulse aria-hidden="true" className="h-4 w-4" />
                  Parent check-in
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/child">
                  <SmilePlus aria-hidden="true" className="h-4 w-4" />
                  Child check-in
                </Link>
              </Button>
            </div>
          </section>

          <GuidedDemoJourney />

          <section
            aria-label="Family wellbeing snapshot"
            className="grid gap-4 md:grid-cols-4"
          >
            <MetricCard
              detail="Family members completed two recent reflections."
              icon={UsersRound}
              label="Check-ins"
              value="2"
            />
            <MetricCard
              detail="Evening routines are helping connection recover."
              icon={MessageSquareHeart}
              label="Connection"
              tone="success"
              value="74%"
            />
            <MetricCard
              detail="Mornings need a smaller transition plan."
              icon={Activity}
              label="Routine ease"
              tone="accent"
              value="62%"
            />
            <MetricCard
              detail="One high-value action is suggested today."
              icon={Sparkles}
              label="Next step"
              tone="secondary"
              value="1"
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <CrossFamilyInsightCard />
            <DailyFamilySummaryCard />
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Card className="interactive-card bg-gradient-to-br from-primary/10 via-card to-accent/10">
              <CardHeader>
                <Badge variant="default">Daily AI insight</Badge>
                <CardTitle>Morning friction is a transition pattern</CardTitle>
                <CardDescription>
                  Today&apos;s notes suggest the hardest moments are not about
                  motivation. They cluster around the move from breakfast to
                  leaving.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {["Prepare one item tonight", "Use one calm cue", "Debrief after school"].map(
                  (item) => (
                    <div
                      className="rounded-lg border border-white/70 bg-card/70 p-4 text-sm font-semibold shadow-soft"
                      key={item}
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mb-3 h-5 w-5 text-success"
                      />
                      {item}
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            <Card className="interactive-card">
              <CardHeader>
                <Badge variant="warm">AI recommendation</Badge>
                <CardTitle>{suggestedActivity.title}</CardTitle>
                <CardDescription>{suggestedActivity.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Badge variant="calm">{suggestedActivity.duration}</Badge>
                <Badge variant="neutral">{suggestedActivity.supportArea}</Badge>
                <Button asChild variant="soft">
                  <Link href="/family">Try in family space</Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <FamilyTimeline />

            <Card>
              <CardHeader>
                <CardTitle>Activity widgets</CardTitle>
                <CardDescription>
                  Small modules that make the dashboard feel useful at a glance.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                {activityWidgets.map((widget) => {
                  const Icon = widget.icon;

                  return (
                    <div
                      className="interactive-card rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
                      key={widget.title}
                    >
                      <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-semibold">{widget.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {widget.detail}
                      </p>
                    </div>
                  );
                })}
              </CardContent>
              <CardContent className="grid gap-3 border-t border-border pt-6">
                <div>
                  <p className="font-semibold">Recent check-ins</p>
                  <p className="text-sm text-muted-foreground">
                    Supportive notes from the demo household.
                  </p>
                </div>
                {recentCheckIns.map((checkIn) => (
                  <div
                    className="rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
                    key={checkIn.id}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">{checkIn.mood}</p>
                      <Badge variant="neutral">{checkIn.createdAt}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {checkIn.note}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Family routine cards</CardTitle>
                <CardDescription>
                  Routines are shown as supportive anchors, not performance
                  targets.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                {routines.map((routine) => (
                  <div
                    className="interactive-card rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
                    key={routine.id}
                  >
                    <Badge
                      variant={
                        routine.status === "steady"
                          ? "success"
                          : routine.status === "needs-attention"
                            ? "warning"
                            : "calm"
                      }
                    >
                      {routine.status.replace("-", " ")}
                    </Badge>
                    <h3 className="mt-4 font-semibold">{routine.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {routine.cadence}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {routine.detail}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
                <CardDescription>
                  Short paths into the main companion spaces.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  { href: "/parent", label: "Reflect as a parent", icon: HeartPulse },
                  { href: "/child", label: "Help a child check in", icon: SmilePlus },
                  { href: "/family", label: "Start family check-in", icon: UsersRound }
                ].map((action) => {
                  const Icon = action.icon;

                  return (
                    <Button asChild key={action.href} variant="secondary">
                      <Link href={action.href}>
                        <Icon aria-hidden="true" className="h-4 w-4" />
                        {action.label}
                      </Link>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb aria-hidden="true" className="h-5 w-5 text-primary" />
                  Recent insights
                </CardTitle>
                <CardDescription>
                  Patterns are framed as signals to explore, not conclusions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.length ? (
                  insights.map((insight) => (
                    <div
                      className="interactive-card rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
                      key={insight.id}
                    >
                      <Badge
                        variant={
                          insight.signal === "positive"
                            ? "success"
                            : insight.signal === "watch"
                              ? "warning"
                              : "neutral"
                        }
                      >
                        {insight.signal}
                      </Badge>
                      <h3 className="mt-3 font-semibold">{insight.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {insight.summary}
                      </p>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    description="Check-ins and routines will appear here once the family has more demo activity."
                    title="No insights yet"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target aria-hidden="true" className="h-5 w-5 text-primary" />
                  Upcoming goals
                </CardTitle>
                <CardDescription>
                  Each goal has one next action so the family can keep momentum.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {goals.map((goal) => (
                  <div className="space-y-3" key={goal.id}>
                    <Progress label={goal.title} value={goal.progress} />
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays
                        aria-hidden="true"
                        className="h-4 w-4 text-primary"
                      />
                      {goal.nextStep}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <CompanionPanel
              context="dashboard"
              prompt="Ask about the possible school-morning pattern, timeline, or tomorrow's suggested experiment."
            />
            <MemoryPanel />
          </section>

          <EvidenceDrawer />

          <SafetyNote />
        </div>
      </div>
    </main>
  );
}
