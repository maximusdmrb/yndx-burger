import { PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay";
import { useSelector } from "../../hooks/use-typed-selector";

const modalRoot = document.getElementById("modal") as HTMLElement;

interface IModalProps {
  title?: string;
  onClose: () => void;
}
export default function Modal({ title, onClose, children }: PropsWithChildren<IModalProps>) {
  const loading = useSelector((store) => store.order.loading);
  const closeEsc = (e: KeyboardEvent) => {
    if (e.key && e.key !== "Escape") return;
    console.log("esc");
    onClose();
  };
  useEffect(() => {
    document.addEventListener("keyup", closeEsc);
    return () => {
      document.removeEventListener("keyup", closeEsc);
    };
  }, [loading]);
  return ReactDOM.createPortal(<ModalOverlay title={title} onClick={onClose} children={children} />, modalRoot);
}
