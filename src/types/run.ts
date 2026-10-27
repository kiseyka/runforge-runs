export type RunStatus = "queued" | "running" | "succeeded" | "failed";

export type Run = {
  id: string;
  name: string;
  repository: string;
  branch: string;
  status: RunStatus;
  createdAt: string; // ISO-дата, например '2026-10-27T09:15:00Z'
  durationSeconds?: number; // ? = поля может не быть
  logs: string[];
  result?: string;
};
