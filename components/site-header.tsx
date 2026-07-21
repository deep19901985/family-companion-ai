import Link from "next/link";
import { HeartHandshake, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/onboarding", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/parent", label: "Parent" },
  { href: "/child", label: "Child" },
  { href: "/family", label: "Family" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-background/80 backdrop-blur-xl">
      <div className="page-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link
          className="inline-flex min-h-11 items-center gap-3 rounded-lg font-semibold transition-transform hover:-translate-y-0.5 focus-visible:shadow-focus"
          href="/"
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-soft">
            <HeartHandshake aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="whitespace-nowrap">Family Companion AI</span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navigation.map((item) => (
            <Link
              className="min-h-11 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-white/75 hover:text-foreground focus-visible:shadow-focus"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="hidden md:inline-flex" size="sm" variant="soft">
          <Link href="/dashboard">
            <LayoutDashboard aria-hidden="true" className="h-4 w-4" />
            View demo
          </Link>
        </Button>
      </div>
      <div className="page-shell flex gap-2 overflow-x-auto pb-3 md:hidden">
        {navigation.map((item) => (
          <Link
            className="min-h-11 shrink-0 rounded-lg border border-white/70 bg-card/80 px-3 py-2 text-sm font-medium text-muted-foreground shadow-soft focus-visible:shadow-focus"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
