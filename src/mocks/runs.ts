import type { Run } from "../types/run";

export const mockRuns: Run[] = [
  {
    id: "run-001",
    name: "Auth refactor",
    repository: "web-platform",
    branch: "feature/auth-refactor",
    status: "running",
    createdAt: "2026-10-27T09:15:00Z",
    logs: [
      "Provisioning workspace (4 vCPU · 16 GB)...",
      "Cloning web-platform · 2,184 files",
      "pnpm install --frozen-lockfile",
      "Running agent: refactoring auth middleware...",
    ],
  },
  {
    id: "run-002",
    name: "Fix checkout tests",
    repository: "payments",
    branch: "fix/checkout-tests",
    status: "succeeded",
    createdAt: "2026-10-27T08:40:00Z",
    durationSeconds: 412,
    logs: [
      "Provisioning workspace (2 vCPU · 4 GB)...",
      "Cloning payments",
      "pnpm test",
      "tests 184 / 184 passed",
    ],
    result:
      "Fixed 3 flaky checkout tests. Diff: +42 −18. Preview: checkout.runforge.dev",
  },
  {
    id: "run-003",
    name: "Update dependencies",
    repository: "api-service",
    branch: "chore/deps-update",
    status: "queued",
    createdAt: "2026-10-27T10:02:00Z",
    logs: ["Run created", "Waiting for available workspace..."],
  },
  {
    id: "run-004",
    name: "Migrate to Postgres 17",
    repository: "api-service",
    branch: "feature/pg17-migration",
    status: "failed",
    createdAt: "2026-10-26T16:20:00Z",
    durationSeconds: 1385,
    logs: [
      "Provisioning workspace (8 vCPU · 32 GB)...",
      "Cloning api-service",
      "Running migrations...",
      'ERROR: migration 0042_add_indexes failed: relation "orders" does not exist',
    ],
    result: "Migration failed at step 0042. No changes were applied.",
  },
  {
    id: "run-005",
    name: "Add dark mode",
    repository: "web-platform",
    branch: "feature/dark-mode",
    status: "succeeded",
    createdAt: "2026-10-25T13:05:00Z",
    durationSeconds: 2710,
    logs: [
      "Provisioning workspace (4 vCPU · 16 GB)...",
      "Cloning web-platform",
      "Agent updated 27 files",
      "pnpm build — OK",
    ],
    result:
      "Dark theme implemented. Diff: +318 −96. Preview: dark.runforge.dev",
  },
  {
    id: "run-006",
    name: "Generate API docs",
    repository: "docs-site",
    branch: "main",
    status: "failed",
    createdAt: "2026-10-24T11:30:00Z",
    durationSeconds: 95,
    logs: [
      "Provisioning workspace (2 vCPU · 4 GB)...",
      "Cloning docs-site",
      "ERROR: workspace terminated: out of memory",
    ],
    // result нет — запуск упал до получения результата
  },
  {
    id: "run-007",
    name: "Optimize image pipeline",
    repository: "media-service",
    branch: "perf/image-pipeline",
    status: "running",
    createdAt: "2026-10-27T10:10:00Z",
    logs: [
      "Provisioning workspace (4 vCPU · 16 GB)...",
      "Cloning media-service",
    ],
  },
];
