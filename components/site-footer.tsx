import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/60 bg-card/70 backdrop-blur">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            </span>
            Family Companion AI
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Supportive family tools for reflection, routines, and communication.
            This demo uses static and local-only state.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold">Explore</p>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <Link className="transition-colors hover:text-foreground" href="/onboarding">
              Onboarding
            </Link>
            <Link className="transition-colors hover:text-foreground" href="/dashboard">
              Dashboard
            </Link>
            <Link className="transition-colors hover:text-foreground" href="/family">
              Family space
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold">Safety</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Supportive, evidence-informed prompts only. Not emergency, medical,
            legal, diagnostic, or crisis care.
          </p>
        </div>
      </div>
    </footer>
  );
}
