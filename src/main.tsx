import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import MainLayout from "./layout/main-layout/main-layout";
import Constructor from "./pages/constructror/constructor";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainLayout>
      <Constructor />
    </MainLayout>
  </React.StrictMode>
);
