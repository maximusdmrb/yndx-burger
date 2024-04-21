import { PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay";

const modalRoot = document.getElementById("modal") as HTMLElement;

interface IModalProps {
  title?: string;
  onClose: () => void;
}
export default function Modal({ title, onClose, children }: PropsWithChildren<IModalProps>) {
  const closeEsc = (e: KeyboardEvent) => {
    if (e.key && e.key !== "Escape") return;
    onClose();
  };
  useEffect(() => {
    document.addEventListener("keyup", closeEsc);
    return () => {
      document.removeEventListener("keyup", closeEsc);
    };
  }, []);
  return ReactDOM.createPortal(<ModalOverlay title={title} onClick={onClose} children={children} />, modalRoot);
}
