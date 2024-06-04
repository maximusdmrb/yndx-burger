import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Typography from "../../components/typography/typography";
import cn from "../../utils/cn";
import styles from "./profile-layout.module.scss";
import { store } from "../../services/store";
import { logout } from "../../services/slices/user-slice";

export default function ProfileLayout() {
  const location = useLocation();
  const handleLogout = () => {
    store.dispatch(logout()).then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });
  };

  return (
    <div className={cn("mt-25", styles.layout)}>
      <nav>
        <ul>
          <li>
            <Link to={"/profile"} className={cn({ active: location.pathname === "/profile" })}>
              Профиль
            </Link>
          </li>
          <li>
            <NavLink to={"/profile/orders"}>История заказов</NavLink>
          </li>
          <li>
            <a onClick={handleLogout}>Выход</a>
          </li>
        </ul>
        <Typography className="mt-20" variants="inactive">
          В этом разделе вы можете изменить свои персональные данные
        </Typography>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
