import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./header.module.scss";
import MenuLink from "../menu-link/MenuLink";
import Logo from "../logo/logo";

export default function AppHeader() {
  return (
    <header className={styles.header + " pt-4 pb-4 pl-5 pr-5"}>
      <div className={"container"}>
        <div className={`${styles.grid}`}>
          <nav className={styles.nav}>
            <MenuLink icon={BurgerIcon} to="/">
              Конструктор
            </MenuLink>
            <MenuLink icon={ListIcon} to="/list">
              Лента заказов
            </MenuLink>
          </nav>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className="right">
            <MenuLink icon={ProfileIcon} to="/profile">
              Личный кабинет
            </MenuLink>
          </div>
        </div>
      </div>
    </header>
  );
}
