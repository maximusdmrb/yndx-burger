import styles from "./modal.module.scss";
import Typography from "../typography/typography";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useLocation, useParams } from "react-router-dom";

export default function IngredientDetails() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const { id } = useParams();
  const ingredient = useTypedSelector((store) => store.ings.ingredients.find((i) => i._id === id));
  return (
    ingredient && (
      <div className={!background ? styles.page : styles.center}>
        {!background && <Typography variant="large">Детали ингредиента</Typography>}
        <img src={ingredient.image_large} alt={ingredient.name} title={ingredient.name} />
        <Typography className="mb-5" variants="medium">
          {ingredient.name}
        </Typography>
        <div className={styles.info}>
          <div className="info-item">
            <Typography>Калории,ккал</Typography>
            <Typography variant="digits">{ingredient.calories}</Typography>
          </div>
          <div className="info-item">
            <Typography>Белки, г</Typography>
            <Typography variant="digits">{ingredient.proteins}</Typography>
          </div>
          <div className="info-item">
            <Typography>Жиры, г</Typography>
            <Typography variant="digits">{ingredient.fat}</Typography>
          </div>
          <div className="info-item">
            <Typography>Углеводы, г</Typography>
            <Typography variant="digits">{ingredient.carbohydrates}</Typography>
          </div>
        </div>
      </div>
    )
  );
}
