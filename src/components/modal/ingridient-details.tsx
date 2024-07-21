import styles from "./modal.module.scss";
import Typography from "../typography/typography";
import { useSelector } from "../../hooks/use-typed-selector";
import { useLocation, useParams } from "react-router-dom";

export default function IngredientDetails() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const { id } = useParams();
  const ingredient = useSelector((store) => store.ings.ingredients.find((i) => i._id === id));
  return (
    ingredient && (
      <div className={!background ? styles.page : styles.center}>
        {!background && <Typography variant="large">Детали ингредиента</Typography>}
        <img src={ingredient.image_large} alt={ingredient.name} title={ingredient.name} />
        <Typography className="mb-5" variant="medium">
          {ingredient.name}
        </Typography>
        <Typography variant="default">{ingredient._id}</Typography>

        <div className={styles.info}>
          <div className="info-item">
            <Typography color="secondary">Калории,ккал</Typography>
            <Typography color="secondary" variant="digits">
              {ingredient.calories}
            </Typography>
          </div>
          <div className="info-item">
            <Typography color="secondary">Белки, г</Typography>
            <Typography color="secondary" variant="digits">
              {ingredient.proteins}
            </Typography>
          </div>
          <div className="info-item">
            <Typography color="secondary">Жиры, г</Typography>
            <Typography color="secondary" variant="digits">
              {ingredient.fat}
            </Typography>
          </div>
          <div className="info-item">
            <Typography color="secondary">Углеводы, г</Typography>
            <Typography color="secondary" variant="digits">
              {ingredient.carbohydrates}
            </Typography>
          </div>
        </div>
      </div>
    )
  );
}
