import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const renderTypesIng = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};
export type TypeIngredient = keyof typeof renderTypesIng;

export default function Tabs({ tabs }: { tabs: TypeIngredient[] }) {
  const [current, setCurrent] = React.useState("bun");
  return (
    <div className="mt-5 mb-10" style={{ display: "flex" }}>
      {tabs.map((type) => (
        <Tab key={type} value={type} active={current === type} onClick={setCurrent}>
          {renderTypesIng[type]}
        </Tab>
      ))}
    </div>
  );
}
