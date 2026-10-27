import type { ReactNode } from "react";
import styles from "./StateMessage.module.css";

type StateMessageProps = {
  title: string;
  description: string;
  action?: ReactNode;
  role?: "alert" | "status";
};

export function StateMessage({
  title,
  description,
  action,
  role = "status",
}: StateMessageProps) {
  return (
    <div className={styles.message} role={role}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
