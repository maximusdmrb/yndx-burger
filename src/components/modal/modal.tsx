import { PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay";

const modalRoot = document.getElementById("modal") as HTMLElement;

export default function Modal({ title, closeFn, children }: { title?: string; closeFn: () => void } & PropsWithChildren) {
  const close = (e: any = null) => {
    if (e.key && e.key !== "Escape") return;
    closeFn();
  };
  useEffect(() => {
    document.addEventListener("keyup", close);
    return () => {
      document.removeEventListener("keyup", close);
    };
  }, []);
  return ReactDOM.createPortal(<ModalOverlay title={title} onClick={close} children={children} />, modalRoot);
}
