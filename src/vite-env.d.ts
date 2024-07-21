/// <reference types="vite/client" />
declare module "react" {
  interface DOMAttributes<T> {
    onPointerEnterCapture?: PointerEventHandler<T> | undefined;
    onPointerLeaveCapture?: PointerEventHandler<T> | undefined;
  }
  interface RefAttributes<T> {
    onPointerEnterCapture?: PointerEventHandler<T> | undefined;
    onPointerLeaveCapture?: PointerEventHandler<T> | undefined;
  }
}

export {};
