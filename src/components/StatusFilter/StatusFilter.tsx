import { RUN_STATUSES, STATUS_LABELS } from "../../constants/runStatus";
import type { RunStatusFilter } from "../../types/run";
import styles from "./StatusFilter.module.css";

const FILTER_OPTIONS: { value: RunStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  ...RUN_STATUSES.map((status) => ({
    value: status,
    label: STATUS_LABELS[status],
  })),
];

type StatusFilterProps = {
  value: RunStatusFilter;
  onChange: (value: RunStatusFilter) => void;
};

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className={styles.group} role="group" aria-label="Filter by status">
      {FILTER_OPTIONS.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.option} ${isActive ? styles.active : ""}`}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
