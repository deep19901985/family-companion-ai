import { CalendarCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { dailyFamilySummary } from "@/lib/milestone2-data";

export function DailyFamilySummaryCard() {
  return (
    <Card className="interactive-card">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="calm">Daily family summary</Badge>
          <CalendarCheck aria-hidden="true" className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Tomorrow has one clear experiment</CardTitle>
        <CardDescription>
          Based only on selected demo inputs, not hidden memory or diagnosis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SummaryRow label="Positive signal" value={dailyFamilySummary.positiveSignal} />
        <SummaryRow label="Difficult moment" value={dailyFamilySummary.difficultMoment} />
        <SummaryRow label="Possible pattern" value={dailyFamilySummary.possiblePattern} />
        <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
          <div className="flex items-start gap-3">
            <Sparkles aria-hidden="true" className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold">Suggested action for tomorrow</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {dailyFamilySummary.tomorrowAction}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Why: {dailyFamilySummary.explanation}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm leading-6">{value}</p>
    </div>
  );
}
