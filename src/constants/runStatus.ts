import type { RunStatus } from "../types/run";

export const RUN_STATUSES: RunStatus[] = [
  "queued",
  "running",
  "succeeded",
  "failed",
];

export const STATUS_LABELS: Record<RunStatus, string> = {
  queued: "Queued",
  running: "Running",
  succeeded: "Succeeded",
  failed: "Failed",
};
