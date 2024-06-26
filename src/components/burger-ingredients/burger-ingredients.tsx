import Typography from "../typography/typography";
import Tabs, { CategoryIngredient, renderTypesIng } from "../tabs/tabs";
import styles from "./burger-ingredients.module.scss";
import IngredientCard from "./ingredient-card/ingredient-card";
import { UIEvent, useEffect, useRef, useState } from "react";
import { switchTab } from "../../services/slices/tab-slice";
import { Ingredient } from "../../interfaces";
import { store } from "../../services/store";

export default function BurgerIngredients({ ingredients }: { ingredients: Ingredient[] }) {
  const [_, setIngredientDetail] = useState<Ingredient | null>(null);
  const typesIngredient = [...new Set(ingredients.map((ingredient) => ingredient.type))];

  const setActiveTab = (e: UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.getBoundingClientRect().top;
    const categoryBlock = [...(e.currentTarget?.childNodes as NodeListOf<HTMLDivElement>)].find((category) => {
      const categoryTop = category.getBoundingClientRect().top;
      const categoryBottom = category.getBoundingClientRect().bottom;
      if (top >= categoryTop && top < categoryBottom) return true;
      return false;
    });
    store.dispatch(switchTab(categoryBlock?.dataset.type));
  };

  const scrollBlock = useRef<HTMLDivElement>(null);
  const scrollToCategory = (type: CategoryIngredient) => {
    if (scrollBlock.current && scrollBlock.current.childNodes) {
      const getTopCategory = [...(scrollBlock.current.childNodes as NodeListOf<HTMLDivElement>)].find((category) => category.dataset.type === type)?.getBoundingClientRect().top || 0;
      const top = getTopCategory - scrollBlock.current.getBoundingClientRect().top + (type !== "bun" ? 40 : 0);
      scrollBlock.current.scrollBy({ behavior: "smooth", top });
    }
  };
  useEffect(() => {
    store.dispatch(switchTab("bun"));
  }, []);

  return (
    <>
      <Tabs tabs={typesIngredient} onTabClick={scrollToCategory} />
      <div className={styles.list + " custom-scroll"} ref={scrollBlock} onScroll={setActiveTab}>
        {typesIngredient.map((type) => (
          <div key={type} data-type={type}>
            <Typography className={`${styles.type}`} variants="medium">
              {renderTypesIng[type]}
            </Typography>
            <div className={styles.items + " pt-6 pl-4 pr-3"}>
              {ingredients
                .filter((ingredient) => ingredient.type === type)
                .map((ingredient) => (
                  <IngredientCard onClick={() => setIngredientDetail(ingredient)} key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
