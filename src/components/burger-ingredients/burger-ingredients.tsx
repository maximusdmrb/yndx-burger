import Typography from "../typography/typography";
import Tabs, { renderTypesIng } from "../tabs/tabs";
import { Ingredient } from "../../pages/constructror/constructor";
import { Fragment } from "react/jsx-runtime";
import styles from "./burger-ingredients.module.scss";
import IngredientCard from "./ingredient-card/ingredient-card";

export default function BurgerIngredients({ data }: { data: Ingredient[] }) {
  const typesIngredient = [...new Set(data.map((item) => item.type))];
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
              {data
                .filter((ingredient) => ingredient.type === type)
                .map((ingredient) => (
                  <IngredientCard key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
