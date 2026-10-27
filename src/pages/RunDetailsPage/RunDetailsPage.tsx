import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BackLink } from "../../components/BackLink/BackLink";
import { Button } from "../../components/Button/Button";
import { RunDetails } from "../../components/RunDetails/RunDetails";
import { StateMessage } from "../../components/StateMessage/StateMessage";
import { useRun } from "../../hooks/useRun";
import styles from "./RunDetailsPage.module.css";

export function RunDetailsPage() {
  const { runId = "" } = useParams();
  const { state, retry } = useRun(runId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [runId]);

  function renderContent() {
    if (state.status === "loading") {
      return (
        <p role="status" className={styles.loading}>
          Loading run…
        </p>
      );
    }

    if (state.status === "error") {
      return (
        <StateMessage
          role="alert"
          title="Couldn't load run"
          description={state.error}
          action={<Button onClick={retry}>Retry</Button>}
        />
      );
    }

    if (state.status === "not-found") {
      return (
        <StateMessage
          title="Run not found"
          description={`There is no run with ID "${runId}".`}
        />
      );
    }

    return <RunDetails run={state.run} />;
  }

  return (
    <section>
      <div className={styles.back}>
        <BackLink />
      </div>
      {renderContent()}
    </section>
  );
}
