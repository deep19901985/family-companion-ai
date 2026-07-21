"use client";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/state";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-shell py-12">
      <div className="space-y-6">
        <ErrorState description="The demo surface could not load. Please try again." />
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </main>
  );
}
