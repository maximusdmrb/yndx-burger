import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Logo from "../logo/logo";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header + " p-4"}>
      <Button htmlType="button">s</Button>
      <Logo />
    </header>
  );
}
