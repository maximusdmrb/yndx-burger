import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Typography from "../../typography/typography";
import styles from "./ingredient-card.module.scss";
import { HTMLAttributes, useMemo } from "react";
import { Ingredient } from "../../../interfaces";
import { useDrag } from "react-dnd";
import { setDragIngredient } from "../../../services/slices/constructor-slice";
import { useDispatch, useSelector } from "../../../hooks/use-typed-selector";
import { Link, useLocation } from "react-router-dom";

export default function IngredientCard({ ingredient, ...props }: HTMLAttributes<HTMLDivElement> & { ingredient: Ingredient }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: ingredient.type === "bun" ? "bun" : "other",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const { bun, selectedIngredients } = useSelector((store) => store.burger);

  const qty = useMemo(() => (ingredient.type === "bun" && bun?._id === ingredient._id ? 2 : selectedIngredients.filter((ing) => ing._id === ingredient._id).length), [bun, selectedIngredients]);

  const handleOnDrag = () => {
    dispatch(setDragIngredient(ingredient));
  };
  const handleOnDragEnd = () => {
    dispatch(setDragIngredient(null));
  };
  return (
    <Link to={`/ingredients/${ingredient._id}`} state={{ background: location }}>
      <div className={styles.card + " noselect"} {...props} draggable ref={dragRef} onDragEnd={handleOnDragEnd} onDrag={handleOnDrag} style={{ opacity }}>
        {!!qty && <Counter count={qty} size="default" extraClass="m-1" />}
        <img src={ingredient.image} title={ingredient.name} alt={ingredient.name} />
        <div className={styles.price}>
          <Typography variant="digits">{ingredient.price}</Typography>
          <CurrencyIcon type="primary" />
        </div>
        <Typography variant="default">{ingredient.name}</Typography>
      </div>
    </Link>
  );
}
