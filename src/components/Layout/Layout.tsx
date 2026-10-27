import type { ReactNode } from "react";
import styles from "./Layout.module.css";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true" />
            runforge
          </Link>
          <span className={styles.project}>
            Project / <strong>web-platform</strong>
          </span>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
