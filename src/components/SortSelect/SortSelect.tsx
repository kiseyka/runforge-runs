import { SORT_OPTIONS, isRunSort } from "../../constants/runSort";
import type { RunSort } from "../../types/run";
import styles from "./SortSelect.module.css";

type SortSelectProps = {
  value: RunSort;
  onChange: (value: RunSort) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>Sort</span>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value;
          if (isRunSort(nextValue)) onChange(nextValue);
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
