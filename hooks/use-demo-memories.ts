"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { initialDemoMemories } from "@/lib/milestone2-data";
import type { DemoMemory } from "@/lib/types";

const STORAGE_KEY = "family-companion-demo-memories";
const MEMORY_EVENT = "family-companion-demo-memories-updated";

function parseMemories(value: string | null): DemoMemory[] | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return null;
    }

    return parsed.filter(
      (item): item is DemoMemory =>
        typeof item?.id === "string" &&
        typeof item?.type === "string" &&
        typeof item?.who === "string" &&
        typeof item?.content === "string" &&
        typeof item?.relativeTime === "string" &&
        typeof item?.relevance === "string"
    );
  } catch {
    return null;
  }
}

export function useDemoMemories() {
  const [memories, setMemories] = useState<DemoMemory[]>(initialDemoMemories);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = parseMemories(window.localStorage.getItem(STORAGE_KEY));
    if (stored) {
      setMemories(stored);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleMemoryEvent = (event: Event) => {
      const customEvent = event as CustomEvent<DemoMemory[]>;
      if (Array.isArray(customEvent.detail)) {
        setMemories(customEvent.detail);
      }
    };

    window.addEventListener(MEMORY_EVENT, handleMemoryEvent);
    return () => window.removeEventListener(MEMORY_EVENT, handleMemoryEvent);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  }, [loaded, memories]);

  const addMemory = useCallback((memory: DemoMemory) => {
    const withoutDuplicate = memories.filter((item) => item.id !== memory.id);
    const next = [memory, ...withoutDuplicate];
    setMemories(next);
    window.dispatchEvent(new CustomEvent(MEMORY_EVENT, { detail: next }));
  }, [memories]);

  const deleteMemory = useCallback((id: string) => {
    const next = memories.filter((memory) => memory.id !== id);
    setMemories(next);
    window.dispatchEvent(new CustomEvent(MEMORY_EVENT, { detail: next }));
  }, [memories]);

  const clearMemories = useCallback(() => {
    window.dispatchEvent(new CustomEvent(MEMORY_EVENT, { detail: [] }));
    setMemories([]);
  }, []);

  const resetMemories = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent(MEMORY_EVENT, { detail: initialDemoMemories })
    );
    setMemories(initialDemoMemories);
  }, []);

  return useMemo(
    () => ({
      memories,
      loaded,
      addMemory,
      deleteMemory,
      clearMemories,
      resetMemories
    }),
    [addMemory, clearMemories, deleteMemory, loaded, memories, resetMemories]
  );
}
