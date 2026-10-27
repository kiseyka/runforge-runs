import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { RunList } from "../../components/RunList/RunList";
import { RunsSkeleton } from "../../components/RunsSkeleton/RunsSkeleton";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { StateMessage } from "../../components/StateMessage/StateMessage";
import { StatusFilter } from "../../components/StatusFilter/StatusFilter";
import { useRuns } from "../../hooks/useRuns";
import type { RunStatusFilter } from "../../types/run";
import { filterRuns } from "../../utils/filterRuns";
import styles from "./RunsPage.module.css";

export function RunsPage() {
  const { state, retry } = useRuns();
  const [statusFilter, setStatusFilter] = useState<RunStatusFilter>("all");
  const [query, setQuery] = useState("");

  function resetFilters() {
    setStatusFilter("all");
    setQuery("");
  }

  function renderContent() {
    if (state.status === "loading") {
      return <RunsSkeleton />;
    }

    if (state.status === "error") {
      return (
        <StateMessage
          role="alert"
          title="Couldn't load runs"
          description={state.error}
          action={<Button onClick={retry}>Retry</Button>}
        />
      );
    }

    if (state.runs.length === 0) {
      return (
        <StateMessage
          title="No runs yet"
          description="Runs will appear here once agents start working."
        />
      );
    }

    const visibleRuns = filterRuns(state.runs, statusFilter, query);

    if (visibleRuns.length === 0) {
      return (
        <StateMessage
          title="No runs found"
          description="Try a different search query or status filter."
          action={
            <Button variant="secondary" onClick={resetFilters}>
              Reset filters
            </Button>
          }
        />
      );
    }

    return (
      <>
        <p className={styles.count}>
          Showing {visibleRuns.length} of {state.runs.length} runs
        </p>
        <RunList runs={visibleRuns} />
      </>
    );
  }

  return (
    <section>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Workspace / Runs</p>
        <h1 className={styles.title}>Runs</h1>
        <p className={styles.subtitle}>Agent runs across your repositories.</p>
      </header>

      <div className={styles.toolbar}>
        <SearchInput value={query} onChange={setQuery} />
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {renderContent()}
    </section>
  );
}
