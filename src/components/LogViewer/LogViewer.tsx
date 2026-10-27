import styles from "./LogViewer.module.css";

type LogViewerProps = {
  logs: string[];
};

export function LogViewer({ logs }: LogViewerProps) {
  if (logs.length === 0) {
    return <p className={styles.empty}>No logs yet.</p>;
  }

  return (
    <ol className={styles.logs}>
      {logs.map((line, index) => (
        <li
          key={index}
          className={`${styles.line} ${line.startsWith("ERROR") ? styles.error : ""}`}
        >
          <span className={styles.lineNumber} aria-hidden="true">
            {index + 1}
          </span>
          <span className={styles.text}>{line}</span>
        </li>
      ))}
    </ol>
  );
}
