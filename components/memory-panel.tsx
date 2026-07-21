"use client";

import { Trash2, RotateCcw, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { EmptyState, LoadingState } from "@/components/ui/state";
import { useDemoMemories } from "@/hooks/use-demo-memories";

export function MemoryPanel() {
  const { memories, loaded, deleteMemory, clearMemories, resetMemories } =
    useDemoMemories();

  if (!loaded) {
    return <LoadingState label="Loading local demo memories" />;
  }

  return (
    <Card className="glass-panel">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="calm">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Memories stay in this browser demo
          </Badge>
          <div className="flex flex-wrap gap-2">
            <Button onClick={resetMemories} size="sm" type="button" variant="ghost">
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Reset
            </Button>
            <Button onClick={clearMemories} size="sm" type="button" variant="secondary">
              Clear all demo memories
            </Button>
          </div>
        </div>
        <div>
          <CardTitle>What the companion remembers</CardTitle>
          <CardDescription>
            These memories are explicit demo records. You can review and delete
            them; the companion does not remember secretly.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {memories.length === 0 ? (
          <EmptyState
            description="Add memories through the guided demo, or reset to restore the starter records."
            title="No demo memories"
          />
        ) : (
          memories.map((memory) => (
            <div
              className="interactive-card rounded-lg border border-white/70 bg-card/75 p-4 shadow-soft"
              key={memory.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="neutral">{memory.type.replace("-", " ")}</Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {memory.relativeTime}
                    </span>
                  </div>
                  <p className="font-semibold">{memory.content}</p>
                  <p className="text-sm text-muted-foreground">
                    Shared by {memory.who}
                  </p>
                </div>
                <Button
                  aria-label={`Delete memory: ${memory.content}`}
                  onClick={() => deleteMemory(memory.id)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <Trash2 aria-hidden="true" className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 rounded-lg bg-muted/60 p-3 text-sm leading-6 text-muted-foreground">
                Why it may be relevant: {memory.relevance}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
