import { BookMarked, ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { evidenceRecords } from "@/lib/milestone2-data";
import type { EvidenceRecord } from "@/lib/types";

type EvidenceDrawerProps = {
  records?: EvidenceRecord[];
  title?: string;
};

export function EvidenceDrawer({
  records = evidenceRecords,
  title = "Evidence-informed explanations"
}: EvidenceDrawerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookMarked aria-hidden="true" className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          Demo reference records are placeholders to be verified before
          production. No real quotations, study results, or statistics are
          invented here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {records.map((record) => (
          <details
            className="rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
            key={record.id}
          >
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-semibold">
              <span>{record.principle}</span>
              <ChevronDown aria-hidden="true" className="h-5 w-5 text-primary" />
            </summary>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>{record.explanation}</p>
              <div className="grid gap-3 md:grid-cols-2">
                <Meta label="Source" value={record.sourcePlaceholder} />
                <Meta label="Organisation" value={record.organization} />
                <Meta label="Link" value={record.linkPlaceholder} />
                <Meta label="Date reviewed" value={record.dateReviewed} />
              </div>
              <Badge variant="neutral">{record.strength}</Badge>
            </div>
          </details>
        ))}
      </CardContent>
    </Card>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/60 p-3">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  );
}
