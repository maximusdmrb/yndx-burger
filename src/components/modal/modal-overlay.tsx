import React, { PropsWithChildren } from "react";
import styles from "./modal.module.scss";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Typography from "../typography/typography";

export default function ModalOverlay({ title, children, onClick, ...props }: PropsWithChildren<React.HTMLProps<HTMLDivElement>>) {
  return (
    <div {...props} onClick={onClick} className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <Typography variants="large">{title ? title : " "}</Typography>
          <div onClick={onClick}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
