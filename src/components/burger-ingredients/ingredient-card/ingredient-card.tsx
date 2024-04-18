import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../../pages/constructror/constructor";
import Typography from "../../typography/typography";
import styles from "./ingredient-card.module.scss";

export default function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className={styles.card}>
      <img src={ingredient.image} title={ingredient.name} alt={ingredient.name} />
      <div className={styles.price}>
        <Typography variants="digits">{ingredient.price}</Typography>
        <CurrencyIcon type="primary" />
      </div>
      <Typography variants="default">{ingredient.name}</Typography>
    </div>
  );
}
