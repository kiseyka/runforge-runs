import { useSearchParams } from "react-router-dom";
import { isRunStatus } from "../../constants/runStatus";
import { Button } from "../../components/Button/Button";
import { RunList } from "../../components/RunList/RunList";
import { RunsSkeleton } from "../../components/RunsSkeleton/RunsSkeleton";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { StateMessage } from "../../components/StateMessage/StateMessage";
import { StatusFilter } from "../../components/StatusFilter/StatusFilter";
import { useRuns } from "../../hooks/useRuns";
import { filterRuns } from "../../utils/filterRuns";
import styles from "./RunsPage.module.css";
import { SortSelect } from "../../components/SortSelect/SortSelect";
import { DEFAULT_SORT, isRunSort } from "../../constants/runSort";
import type { RunSort, RunStatusFilter } from "../../types/run";
import { sortRuns } from "../../utils/sortRuns";

export function RunsPage() {
  const { state, retry } = useRuns();
  const [searchParams, setSearchParams] = useSearchParams();

  const statusParam = searchParams.get("status");
  const statusFilter: RunStatusFilter = isRunStatus(statusParam)
    ? statusParam
    : "all";
  const query = searchParams.get("q") ?? "";
  const sortParam = searchParams.get("sort");
  const sort: RunSort = isRunSort(sortParam) ? sortParam : DEFAULT_SORT;

  function handleStatusChange(status: RunStatusFilter) {
    setSearchParams(
      (params) => {
        if (status === "all") params.delete("status");
        else params.set("status", status);
        return params;
      },
      { replace: true },
    );
  }

  function handleQueryChange(value: string) {
    setSearchParams(
      (params) => {
        if (value === "") params.delete("q");
        else params.set("q", value);
        return params;
      },
      { replace: true },
    );
  }
  function handleSortChange(value: RunSort) {
    setSearchParams(
      (params) => {
        if (value === DEFAULT_SORT) params.delete("sort");
        else params.set("sort", value);
        return params;
      },
      { replace: true },
    );
  }

  function resetFilters() {
    setSearchParams(
      (params) => {
        params.delete("status");
        params.delete("q");
        return params;
      },
      { replace: true },
    );
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

    const visibleRuns = sortRuns(
      filterRuns(state.runs, statusFilter, query),
      sort,
    );

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
        <div className={styles.listHeader}>
          <p className={styles.count}>
            Showing {visibleRuns.length} of {state.runs.length} runs
          </p>
          <SortSelect value={sort} onChange={handleSortChange} />
        </div>
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
        <SearchInput value={query} onChange={handleQueryChange} />
        <StatusFilter value={statusFilter} onChange={handleStatusChange} />
      </div>

      {renderContent()}
    </section>
  );
}
