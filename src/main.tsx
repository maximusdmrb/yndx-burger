import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import MainLayout from "./layout/main-layout/main-layout";
import Constructor from "./pages/home/constructor";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Page404 from "./pages/not-found";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import { GuestRoute, PrivateRoute } from "./components/protected-route";
import Profile from "./pages/profile/profile";
import "./utils/axios";
import CenterLayout from "./layout/center-layout";
import Modal from "./components/modal/modal";
import IngredientDetails from "./components/modal/ingridient-details";
import { ingredientsQuery } from "./services/slices/ingredients-slice";
import ProfileLayout from "./layout/profile-layout/profile-layout";
import { getUser } from "./services/slices/user-slice";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;
  useEffect(() => {
    store.dispatch(ingredientsQuery());
    localStorage.getItem("accessToken") && store.dispatch(getUser());
  }, []);
  const handleCloseModal = () => {
    navigate(-1);
  };
  return (
    <>
      <Routes location={background || location}>
        <Route path="" element={<MainLayout />}>
          <Route index element={<Constructor />} />

          <Route path="profile" element={<PrivateRoute element={<ProfileLayout />} />}>
            <Route index element={<Profile />} />
            <Route path="orders" element={<>История заказов</>} />
          </Route>

          <Route element={<CenterLayout />}>
            <Route path="ingredients/:id" element={<IngredientDetails />} />
            {/* Auth Routes */}
            <Route path="login" element={<GuestRoute element={<Login />} />} />
            <Route path="register" element={<GuestRoute element={<Register />} />} />
            <Route path="forgot-password" element={<GuestRoute element={<ForgotPassword />} />} />
            <Route path="reset-password" element={<GuestRoute element={<ResetPassword />} />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
