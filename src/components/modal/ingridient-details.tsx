import { Ingredient } from "../../pages/constructror/constructor";
import styles from "./modal.module.scss";
import Typography from "../typography/typography";

export default function IngredientDetails({ ingredient }: { ingredient: Ingredient }) {
  return (
    <>
      <img src={ingredient.image_large} alt={ingredient.name} title={ingredient.name} />
      <Typography className="mb-5" variants="medium">
        {ingredient.name}
      </Typography>
      <div className={styles.info}>
        <div className="info-item">
          <Typography>Калории,ккал</Typography>
          <Typography variants="digits">{ingredient.calories}</Typography>
        </div>
        <div className="info-item">
          <Typography>Белки, г</Typography>
          <Typography variants="digits">{ingredient.proteins}</Typography>
        </div>
        <div className="info-item">
          <Typography>Жиры, г</Typography>
          <Typography variants="digits">{ingredient.fat}</Typography>
        </div>
        <div className="info-item">
          <Typography>Углеводы, г</Typography>
          <Typography variants="digits">{ingredient.carbohydrates}</Typography>
        </div>
      </div>
    </>
  );
}
