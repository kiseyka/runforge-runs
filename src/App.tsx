import { Layout } from "./components/Layout/Layout";
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
      {state.status === "success" && <p>Runs loaded: {state.runs.length}</p>}
    </Layout>
  );
}

export default App;
