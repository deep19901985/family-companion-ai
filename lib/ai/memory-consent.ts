import type { DemoMemory, MemorySuggestion } from "../types";

export function createMemoryFromSuggestion(
  suggestion: MemorySuggestion,
  contentOverride?: string
): DemoMemory {
  const content = (contentOverride ?? suggestion.content).trim();

  return {
    id: `memory-ai-${Date.now()}-${content.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 32)}`,
    type: suggestion.type,
    who: suggestion.who,
    content,
    relativeTime: "Just now",
    relevance: suggestion.relevance
  };
}
