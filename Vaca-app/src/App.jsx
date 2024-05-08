import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
const Groups = lazy(() => import("./pages/Grupos"));
const Gastos = lazy(() => import("./pages/Gastos"));
const Amigos = lazy(() => import("./pages/Amigos"));
const GroupDetails = lazy(() => import("./pages/GroupDetails"));

//? Estilo para los botones generalizado

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Header />
        <Routes>
          <Route path="/amigos" element={<Amigos />} />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/grupos" element={<Groups />} />
          <Route path="/grupos/:id" element={<GroupDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
