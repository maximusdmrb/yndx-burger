import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

export default function CenterLayout({ children }: PropsWithChildren) {
  return <div className="center overflow">{children || <Outlet />}</div>;
}
