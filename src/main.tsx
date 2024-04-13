import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import MainLayout from "./layout/main-layout/main-layout";
import BurgerConstructor from "./pages/burger-constructor";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainLayout>
      <BurgerConstructor />
    </MainLayout>
  </React.StrictMode>
);
