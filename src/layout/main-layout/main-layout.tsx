import { PropsWithChildren } from "react";
import AppHeader from "../../components/header/header";
import styles from "./main-layout.module.scss";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <main className="pl-5 pr-5">
        <div className={`${styles.container} container`}>{children}</div>
      </main>
    </div>
  );
}
