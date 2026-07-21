"use client";

import { useMemo, useState } from "react";
import { Bot, HeartPulse, MessageSquareHeart, SmilePlus, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { demoTimelineEvents } from "@/lib/milestone2-data";
import type { TimelineEventType } from "@/lib/types";

const filters: Array<"all" | TimelineEventType> = [
  "all",
  "parent",
  "child",
  "family",
  "suggestion"
];

const iconMap = {
  parent: HeartPulse,
  child: SmilePlus,
  family: UsersRound,
  suggestion: Bot
};

export function FamilyTimeline() {
  const [filter, setFilter] = useState<"all" | TimelineEventType>("all");

  const events = useMemo(() => {
    if (filter === "all") {
      return demoTimelineEvents;
    }

    return demoTimelineEvents.filter((event) => event.type === filter);
  }, [filter]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Family timeline</CardTitle>
            <CardDescription>
              Parent check-ins, child moods, family activities, completed goals,
              and local AI suggestions.
            </CardDescription>
          </div>
          <MessageSquareHeart aria-hidden="true" className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Timeline filters">
          {filters.map((item) => (
            <Button
              key={item}
              onClick={() => setFilter(item)}
              size="sm"
              type="button"
              variant={filter === item ? "default" : "secondary"}
            >
              {item === "all" ? "All" : item === "suggestion" ? "Suggestions" : item[0].toUpperCase() + item.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {events.map((event) => {
            const Icon = iconMap[event.type];

            return (
              <div className="relative pl-8" key={event.id}>
                <span className="absolute left-0 top-2 h-full w-px bg-border" />
                <span className="absolute left-[-0.6rem] top-1 grid h-6 w-6 place-items-center rounded-full bg-card text-primary shadow-soft">
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                <div className="interactive-card rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant={event.type === "suggestion" ? "calm" : "neutral"}>
                      {event.label}
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {event.relativeTime}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold">{event.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {event.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
