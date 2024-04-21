import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../../pages/constructror/constructor";
import Typography from "../../typography/typography";
import styles from "./ingredient-card.module.scss";
import { HTMLAttributes } from "react";

export default function IngredientCard({ ingredient, ...props }: HTMLAttributes<HTMLDivElement> & { ingredient: Ingredient }) {
  return (
    <div className={styles.card} {...props}>
      {!!ingredient.count && <Counter count={ingredient.count} size="default" extraClass="m-1" />}
      <img src={ingredient.image} title={ingredient.name} alt={ingredient.name} />
      <div className={styles.price}>
        <Typography variants="digits">{ingredient.price}</Typography>
        <CurrencyIcon type="primary" />
      </div>
      <Typography variants="default">{ingredient.name}</Typography>
    </div>
  );
}
