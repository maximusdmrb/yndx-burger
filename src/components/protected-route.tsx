import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../services/store";
import CenterLayout from "../layout/center-layout";

type ProtectedRouteProps = {
  forGuest?: boolean;
  element: React.ReactNode;
};

export function ProtectedRoute({ forGuest = false, element }: ProtectedRouteProps) {
  const { user, isAuthChecked, isLoading } = useSelector((store) => store.user);
  const location = useLocation();

  /* Еще не прошла проверка токена */
  if ((!isAuthChecked || isLoading) && localStorage.getItem("accessToken"))
    return (
      <CenterLayout>
        <img src="/loader.svg" alt="loading..." />
      </CenterLayout>
    );

  /* Авторизован, но роут для гостей */
  if (forGuest && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  /* Не авторизован, защищенный роут */
  if (!forGuest && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  /* Для гостей, не авторизован | Авторизован, защищенный роут */
  return element;
}

export const PrivateRoute = ({ ...props }: Omit<ProtectedRouteProps, "forGuest">) => (
  <ProtectedRoute {...props} />
);
export const GuestRoute = ({ ...props }: Omit<ProtectedRouteProps, "forGuest">) => (
  <ProtectedRoute {...props} forGuest />
);
