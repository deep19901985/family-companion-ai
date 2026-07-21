import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/state";

export default function NotFound() {
  return (
    <main className="page-shell py-12">
      <div className="space-y-6">
        <ErrorState
          description="That family space does not exist in this demo yet."
          title="Page not found"
        />
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </main>
  );
}
