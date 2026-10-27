import { Layout } from "./components/Layout/Layout";
import { RunList } from "./components/RunList/RunList";
import { useRuns } from "./hooks/useRuns";

function App() {
  const { state, retry } = useRuns();

  return (
    <Layout>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && (
        <div>
          <p>{state.error}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}
      {state.status === "success" && <RunList runs={state.runs} />}
    </Layout>
  );
}

export default App;
