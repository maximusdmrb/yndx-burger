import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./link.module.scss";
import { PropsWithChildren, ReactElement } from "react";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

export default function MenuLink({ active, to, icon, children }: PropsWithChildren<{ active?: boolean; to: string; icon: ({ type }: TIconProps) => ReactElement }>) {
  const Icon = icon;
  return (
    /* Replace to <Link> from React Router  */
    <a href={to}>
      <Button htmlType="button" type="secondary">
        <div className={`${styles.link} ${active ? styles.active : ""}`}>
          <Icon type={active ? "primary" : "secondary"} />
          <span>{children}</span>
        </div>
      </Button>
    </a>
  );
}
