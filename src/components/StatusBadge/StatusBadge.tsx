import { STATUS_LABELS } from "../../constants/runStatus";
import type { RunStatus } from "../../types/run";
import styles from "./StatusBadge.module.css";

type StatusBadgeProps = {
  status: RunStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  );
}
