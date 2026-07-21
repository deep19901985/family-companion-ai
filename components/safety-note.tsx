import type { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SafetyNote({
  className,
  children
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Card
      className={cn(
        "glass-panel border-primary/25 bg-gradient-to-br from-primary/10 via-card to-accent/10",
        className
      )}
    >
      <CardContent className="flex gap-4 pt-6">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <ShieldAlert aria-hidden="true" className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Safety and support boundary</p>
          <div className="text-sm leading-6 text-muted-foreground">
            {children ?? (
              <p>
                Family Companion AI is a supportive demo, not emergency,
                medical, legal, diagnostic, or professional care. Children should
                be guided with parent or trusted adult oversight.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
