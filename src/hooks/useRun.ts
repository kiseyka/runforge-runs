import { useEffect, useState } from "react";
import { fetchRunById } from "../api/runsApi";
import type { Run } from "../types/run";

type RunState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "not-found" }
  | { status: "success"; run: Run };

export function useRun(runId: string) {
  const [state, setState] = useState<RunState>({ status: "loading" });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const run = await fetchRunById(runId);
        if (ignore) return;
        setState(run ? { status: "success", run } : { status: "not-found" });
      } catch (error) {
        if (!ignore) {
          const message =
            error instanceof Error ? error.message : "Unknown error";
          setState({ status: "error", error: message });
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [runId, reloadKey]);

  function retry() {
    setState({ status: "loading" });
    setReloadKey((key) => key + 1);
  }

  return { state, retry };
}
