import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { fetchRuns } from "./api/runsApi";

vi.mock("./api/runsApi", async () => {
  const { mockRuns } = await import("./mocks/runs");
  return {
    fetchRuns: vi.fn(async () => mockRuns),
    fetchRunById: vi.fn(
      async (id: string) => mockRuns.find((run) => run.id === id) ?? null,
    ),
  };
});

function renderApp(initialPath = "/") {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
  return { user };
}

describe("Runs page", () => {
  it("filters runs by status", async () => {
    const { user } = renderApp();
    await screen.findByText("Auth refactor");

    await user.click(screen.getByRole("button", { name: "Failed" }));

    expect(screen.getByRole("button", { name: "Failed" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Migrate to Postgres 17")).toBeInTheDocument();
    expect(screen.getByText("Generate API docs")).toBeInTheDocument();
    expect(screen.queryByText("Auth refactor")).not.toBeInTheDocument();
  });

  it("searches runs by name or repository", async () => {
    const { user } = renderApp();
    await screen.findByText("Auth refactor");

    await user.type(screen.getByRole("searchbox"), "payments");

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("Fix checkout tests")).toBeInTheDocument();
  });

  it("combines search with status filter and shows empty state with reset", async () => {
    const { user } = renderApp();
    await screen.findByText("Auth refactor");

    await user.click(screen.getByRole("button", { name: "Queued" }));
    await user.type(screen.getByRole("searchbox"), "payments");

    expect(screen.getByText("No runs found")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reset filters" }));

    expect(screen.getAllByRole("listitem")).toHaveLength(7);
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });

  it("opens run details and navigates back to the list", async () => {
    const { user } = renderApp();

    await user.click(
      await screen.findByRole("link", { name: "Migrate to Postgres 17" }),
    );

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Migrate to Postgres 17",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/migration 0042_add_indexes failed/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Migration failed at step 0042. No changes were applied.",
      ),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "All runs" }));

    expect(
      await screen.findByRole("heading", { level: 1, name: "Runs" }),
    ).toBeInTheDocument();
  });

  it("shows an error and retries loading", async () => {
    vi.mocked(fetchRuns).mockRejectedValueOnce(
      new Error("Failed to load runs"),
    );
    const { user } = renderApp();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Failed to load runs",
    );

    await user.click(screen.getByRole("button", { name: "Retry" }));

    expect(await screen.findByText("Auth refactor")).toBeInTheDocument();
  });

  it("shows not found for unknown run id", async () => {
    renderApp("/runs/unknown");

    expect(await screen.findByText("Run not found")).toBeInTheDocument();
  });
});
