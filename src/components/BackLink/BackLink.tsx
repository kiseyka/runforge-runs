import { Link, useLocation } from "react-router-dom";
import styles from "./BackLink.module.css";

type BackLinkState = { listSearch?: string } | null;

export function BackLink() {
  const location = useLocation();
  const listSearch = (location.state as BackLinkState)?.listSearch ?? "";

  return (
    <Link to={`/${listSearch}`} className={styles.link}>
      <span className={styles.arrow} aria-hidden="true">
        ←
      </span>{" "}
      All runs
    </Link>
  );
}
