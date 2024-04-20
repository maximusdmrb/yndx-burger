import Typography from "../typography/typography";
import Tabs, { renderTypesIng } from "../tabs/tabs";
import { Ingredient } from "../../pages/constructror/constructor";
import { Fragment } from "react/jsx-runtime";
import styles from "./burger-ingredients.module.scss";
import IngredientCard from "./ingredient-card/ingredient-card";
import { useMemo, useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingridient-details";

export default function BurgerIngredients({ ingredients }: { ingredients: Ingredient[] }) {
  const [ingredientDetail, setIngredientDetaill] = useState<Ingredient | null>(null);
  const typesIngredient = [...new Set(ingredients.map((ingredient) => ingredient.type))];

  return (
    <>
      <Typography variants="large">Соберите бургер</Typography>
      <Tabs tabs={typesIngredient} />
      <div className={styles.list + " custom-scroll"}>
        {typesIngredient.map((type) => (
          <Fragment key={type}>
            <Typography className={`${styles.type}`} variants="medium">
              {renderTypesIng[type]}
            </Typography>
            <div className={styles.items + " pt-6 pl-4 pr-3"}>
              {ingredients
                .filter((ingredient) => ingredient.type === type)
                .map((ingredient) => (
                  <IngredientCard onClick={() => setIngredientDetaill(ingredient)} key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
          </Fragment>
        ))}
      </div>
      {ingredientDetail && (
        <Modal title="Детали ингредиента" closeFn={() => setIngredientDetaill(null)}>
          <IngredientDetails ingredient={ingredientDetail} />
        </Modal>
      )}
    </>
  );
}
