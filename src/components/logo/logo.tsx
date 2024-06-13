import { Logo as Logotype } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <Logotype />
    </Link>
  );
}
