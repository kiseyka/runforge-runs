import { Link } from "react-router-dom";
import styles from "./BackLink.module.css";

export function BackLink() {
  return (
    <Link to="/" className={styles.link}>
      <span className={styles.arrow} aria-hidden="true">
        ←
      </span>
      All runs
    </Link>
  );
}
