import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./link.module.scss";
import { PropsWithChildren, ReactElement } from "react";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import { NavLink } from "react-router-dom";

export default function MenuLink({ to, icon, children }: PropsWithChildren<{ to: string; icon: ({ type }: TIconProps) => ReactElement }>) {
  const Icon = icon;
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button htmlType="button" type="secondary">
          <div className={`${styles.link} ${isActive ? styles.active : ""}`}>
            <Icon type={isActive ? "primary" : "secondary"} />
            <span>{children}</span>
          </div>
        </Button>
      )}
    </NavLink>
  );
}
