import { BookMarked, ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { verifiedEvidenceRecords } from "@/lib/ai/evidence-registry";
import type { EvidenceRecord } from "@/lib/types";

type EvidenceDrawerProps = {
  records?: EvidenceRecord[];
  title?: string;
};

export function EvidenceDrawer({
  records = verifiedEvidenceRecords,
  title = "View sources"
}: EvidenceDrawerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookMarked aria-hidden="true" className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          Official-source records and clearly labelled demo placeholders. No
          quotations, study results, or statistics are invented here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {records.map((record) => (
          <details
            className="rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
            key={record.id}
          >
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-semibold">
              <span>{record.title}</span>
              <ChevronDown aria-hidden="true" className="h-5 w-5 text-primary" />
            </summary>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>{record.summary}</p>
              <div className="grid gap-3 md:grid-cols-2">
                <Meta label="Organisation" value={record.organisation} />
                <Meta label="Topic" value={record.topic} />
                <Meta label="Date accessed" value={record.dateAccessed} />
                <Meta label="Last reviewed" value={record.lastReviewed} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral">{record.evidenceCategory}</Badge>
                <Badge
                  variant={
                    record.productionVerificationStatus.includes("verified")
                      ? "success"
                      : "warning"
                  }
                >
                  {record.placeholderLabel ?? record.productionVerificationStatus}
                </Badge>
              </div>
              {record.sourceUrl.startsWith("http") ? (
                <a
                  className="inline-flex font-semibold text-primary underline-offset-4 hover:underline"
                  href={record.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open official source
                </a>
              ) : (
                <p className="font-semibold text-foreground">{record.sourceUrl}</p>
              )}
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
