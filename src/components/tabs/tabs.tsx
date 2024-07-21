import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../hooks/use-typed-selector";

export const renderTypesIng = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};
export type CategoryIngredient = keyof typeof renderTypesIng;

export default function Tabs({ tabs, onTabClick }: { tabs: CategoryIngredient[]; onTabClick: (type: CategoryIngredient) => void }) {
  const activeTab = useSelector((store) => store.tab);
  return (
    <div className="mt-5 mb-10" style={{ display: "flex" }}>
      {tabs.map((type) => (
        <Tab key={type} value={type} active={activeTab === type} onClick={onTabClick.bind(null, type)}>
          {renderTypesIng[type]}
        </Tab>
      ))}
    </div>
  );
}
