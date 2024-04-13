import { PropsWithChildren } from "react";
import Header from "../../components/header/header";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
