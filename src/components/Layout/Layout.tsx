import type { ReactNode } from "react";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true" />
            runforge
          </span>
          <span className={styles.project}>
            Project / <strong>web-platform</strong>
          </span>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
