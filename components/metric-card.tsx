import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  tone?: "primary" | "accent" | "secondary" | "success";
};

const toneClass = {
  primary: "bg-primary/10 text-primary ring-primary/10",
  accent: "bg-accent/10 text-accent ring-accent/10",
  secondary: "bg-secondary/20 text-foreground ring-secondary/20",
  success: "bg-success/10 text-success ring-success/10"
};

const toneBarClass = {
  primary: "from-primary to-accent",
  accent: "from-accent to-calm",
  secondary: "from-secondary to-warning",
  success: "from-success to-primary"
};

export function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "primary"
}: MetricCardProps) {
  return (
    <Card className="interactive-card">
      <CardContent className="space-y-5 pt-6">
        <div
          className={cn(
            "grid h-12 w-12 place-items-center rounded-lg ring-8",
            toneClass[tone]
          )}
        >
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full w-3/4 rounded-full bg-gradient-to-r", toneBarClass[tone])}
          />
        </div>
      </CardContent>
    </Card>
  );
}
