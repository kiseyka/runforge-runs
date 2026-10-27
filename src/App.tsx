import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { RunDetailsPage } from "./pages/RunDetailsPage/RunDetailsPage";
import { RunsPage } from "./pages/RunsPage/RunsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RunsPage />} />
        <Route path="/runs/:runId" element={<RunDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
