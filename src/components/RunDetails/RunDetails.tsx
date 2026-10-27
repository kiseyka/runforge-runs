import type { Run, RunStatus } from "../../types/run";
import { formatDate, formatDuration } from "../../utils/format";
import { LogViewer } from "../LogViewer/LogViewer";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import styles from "./RunDetails.module.css";

function getEmptyResultText(status: RunStatus): string {
  switch (status) {
    case "queued":
    case "running":
      return "The result will be available when the run finishes.";
    case "failed":
      return "The run failed before producing a result.";
    case "succeeded":
      return "No result was reported for this run.";
  }
}

type RunDetailsProps = {
  run: Run;
};

export function RunDetails({ run }: RunDetailsProps) {
  return (
    <article>
      <title>{`${run.name} · Runforge`}</title>

      <header className={styles.header}>
        <p className={styles.eyebrow}>Run / {run.id}</p>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{run.name}</h1>
          <StatusBadge status={run.status} />
        </div>
      </header>

      <dl className={styles.meta}>
        <div>
          <dt>Repository</dt>
          <dd className={styles.mono}>{run.repository}</dd>
        </div>
        <div>
          <dt>Branch</dt>
          <dd className={styles.mono}>{run.branch}</dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>
            <time dateTime={run.createdAt}>{formatDate(run.createdAt)}</time>
          </dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{formatDuration(run.durationSeconds)}</dd>
        </div>
      </dl>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Logs</h2>
        <LogViewer logs={run.logs} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Result</h2>
        {run.result ? (
          <p className={styles.result}>{run.result}</p>
        ) : (
          <p className={styles.muted}>{getEmptyResultText(run.status)}</p>
        )}
      </section>
    </article>
  );
}
