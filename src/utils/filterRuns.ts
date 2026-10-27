import type { Run, RunStatusFilter } from "../types/run";

export function filterRuns(
  runs: Run[],
  status: RunStatusFilter,
  query: string,
): Run[] {
  const normalizedQuery = query.trim().toLowerCase();

  return runs.filter((run) => {
    const matchesStatus = status === "all" || run.status === status;
    const matchesQuery =
      normalizedQuery === "" ||
      run.name.toLowerCase().includes(normalizedQuery) ||
      run.repository.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
}
