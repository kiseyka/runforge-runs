import type { Run, RunSort } from "../types/run";

function compareDuration(a: Run, b: Run, direction: "asc" | "desc"): number {
  const aDuration = a.durationSeconds;
  const bDuration = b.durationSeconds;

  if (aDuration === undefined && bDuration === undefined) return 0;
  if (aDuration === undefined) return 1;
  if (bDuration === undefined) return -1;

  const diff = aDuration - bDuration;
  return direction === "asc" ? diff : -diff;
}

export function sortRuns(runs: Run[], sort: RunSort): Run[] {
  return [...runs].sort((a, b) => {
    switch (sort) {
      case "newest":
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      case "oldest":
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      case "longest":
        return compareDuration(a, b, "desc");
      case "shortest":
        return compareDuration(a, b, "asc");
    }
  });
}
