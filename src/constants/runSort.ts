import type { RunSort } from "../types/run";

export const DEFAULT_SORT: RunSort = "newest";

export const SORT_OPTIONS: { value: RunSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "longest", label: "Longest duration" },
  { value: "shortest", label: "Shortest duration" },
];

export function isRunSort(value: string | null): value is RunSort {
  return SORT_OPTIONS.some((option) => option.value === value);
}
