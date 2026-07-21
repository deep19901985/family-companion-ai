import { AlertCircle, Loader2, Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function LoadingState({ label = "Preparing your space" }: { label?: string }) {
  return (
    <Card className="glass-panel">
      <CardContent className="flex min-h-48 items-center justify-center gap-3 pt-6 text-muted-foreground">
        <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin text-primary" />
        <p className="text-sm font-medium">{label}</p>
      </CardContent>
    </Card>
  );
}

export function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="glass-panel">
      <CardContent className="flex min-h-40 flex-col items-center justify-center gap-3 pt-6 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-lg bg-primary/10 text-primary">
          <Search aria-hidden="true" className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">{title}</p>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ErrorState({
  title = "Something needs attention",
  description
}: {
  title?: string;
  description: string;
}) {
  return (
    <Card className="glass-panel border-secondary/30">
      <CardContent className="flex min-h-40 flex-col items-center justify-center gap-3 pt-6 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-lg bg-secondary/20 text-secondary">
          <AlertCircle aria-hidden="true" className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">{title}</p>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
