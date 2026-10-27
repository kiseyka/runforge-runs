import { useEffect, useState } from "react";
import { fetchRuns } from "../api/runsApi";
import type { Run } from "../types/run";

type RunsState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; runs: Run[] };

export function useRuns() {
  const [state, setState] = useState<RunsState>({ status: "loading" });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const runs = await fetchRuns();
        if (!ignore) {
          setState({ status: "success", runs });
        }
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
  }, [reloadKey]);

  function retry() {
    setState({ status: "loading" });
    setReloadKey((key) => key + 1);
  }

  return { state, retry };
}
