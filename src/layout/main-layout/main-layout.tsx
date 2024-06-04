import AppHeader from "../../components/header/header";
import styles from "./main-layout.module.scss";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <main className="pl-5 pr-5 ">
        <div className={`${styles.container} container`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
