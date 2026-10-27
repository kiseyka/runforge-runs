import { useRuns } from "./hooks/useRuns";

function App() {
  const { state, retry } = useRuns();

  if (state.status === "loading") return <p>Загрузка...</p>;
  if (state.status === "error") {
    return (
      <div>
        <p>{state.error}</p>
        <button onClick={retry}>Повторить</button>
      </div>
    );
  }
  return <p>Загружено запусков: {state.runs.length}</p>;
}

export default App;
