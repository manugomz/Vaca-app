import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Loader from "./components/Loader";

const Groups = lazy(() => import("./pages/Groups"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Friends = lazy(() => import("./pages/Friends"));
const GroupDetails = lazy(() => import("./pages/GroupDetails"));

//? Estilo para los botones generalizado

function App() {
  return (
    <>
      <Suspense fallback={<Loader/>}>
        <Header />
        <Routes>
          <Route path="/amigos" element={<Friends />} />
          <Route path="/gastos" element={<Expenses />} />
          <Route path="/grupos" element={<Groups />} />
          <Route path="/grupos/:id" element={<GroupDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
