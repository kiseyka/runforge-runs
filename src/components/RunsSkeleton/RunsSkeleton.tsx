import styles from "./RunsSkeleton.module.css";

const SKELETON_COUNT = 4;

export function RunsSkeleton() {
  return (
    <div role="status">
      <span className="visually-hidden">Loading runs…</span>
      <ul className={styles.list} aria-hidden="true">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <li key={index} className={styles.card}>
            <span className={`${styles.line} ${styles.title}`} />
            <span className={`${styles.line} ${styles.meta}`} />
            <span className={`${styles.line} ${styles.badge}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
