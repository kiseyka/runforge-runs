import type { Run } from "../../types/run";
import { formatDate, formatDuration } from "../../utils/format";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import styles from "./RunCard.module.css";

type RunCardProps = {
  run: Run;
};

export function RunCard({ run }: RunCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.name}>{run.name}</h3>
        <p className={styles.meta}>
          <span>{run.repository}</span>
          <span aria-hidden="true">·</span>
          <span className={styles.branch}>{run.branch}</span>
        </p>
      </div>

      <StatusBadge status={run.status} />

      <dl className={styles.details}>
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
    </article>
  );
}
