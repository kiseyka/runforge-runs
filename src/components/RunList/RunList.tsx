import type { Run } from "../../types/run";
import { RunCard } from "../RunCard/RunCard";
import styles from "./RunList.module.css";

type RunListProps = {
  runs: Run[];
};

export function RunList({ runs }: RunListProps) {
  return (
    <ul className={styles.list}>
      {runs.map((run) => (
        <li key={run.id}>
          <RunCard run={run} />
        </li>
      ))}
    </ul>
  );
}
