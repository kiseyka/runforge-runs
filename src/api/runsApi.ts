import { mockRuns } from "../mocks/runs";
import type { Run } from "../types/run";

const DELAY_MS = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldFail(): boolean {
  return new URLSearchParams(window.location.search).has("error");
}

export async function fetchRuns(): Promise<Run[]> {
  await delay(DELAY_MS);

  if (shouldFail()) {
    throw new Error("Failed to load runs");
  }

  return mockRuns;
}

export async function fetchRunById(id: string): Promise<Run | null> {
  await delay(DELAY_MS);

  if (shouldFail()) {
    throw new Error("Failed to load run");
  }

  return mockRuns.find((run) => run.id === id) ?? null;
}
