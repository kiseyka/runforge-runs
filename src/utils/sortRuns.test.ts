import { describe, expect, it } from "vitest";
import { mockRuns } from "../mocks/runs";
import { sortRuns } from "./sortRuns";

describe("sortRuns", () => {
  it("puts runs without duration last when sorting by shortest", () => {
    const sorted = sortRuns(mockRuns, "shortest");
    const durations = sorted.map((run) => run.durationSeconds);

    expect(durations).toEqual([
      95,
      412,
      1385,
      2710,
      undefined,
      undefined,
      undefined,
    ]);
  });

  it("does not mutate the original array", () => {
    const originalOrder = mockRuns.map((run) => run.id);

    sortRuns(mockRuns, "newest");

    expect(mockRuns.map((run) => run.id)).toEqual(originalOrder);
  });
});
