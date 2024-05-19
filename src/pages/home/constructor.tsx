import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import styles from "./constructor.module.scss";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useEffect } from "react";
import { ingredientsQuery } from "../../services/slices/ingredients-slice";
import { store } from "../../services/store";
import Typography from "../../components/typography/typography";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Constructor() {
  const { isLoading, ingredients, error } = useTypedSelector((store) => store.ings);
  useEffect(() => {
    store.dispatch(ingredientsQuery());
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.grid + " pb-10 "}>
        <div className={styles.col + " pt-10"}>
          <Typography variants="large">{isLoading ? "Загрузка..." : error || "Соберите бургер"}</Typography>
          {!isLoading && !error && <BurgerIngredients ingredients={ingredients} />}
        </div>
        <div className={styles.col + " pl-4 pt-25"}>{!isLoading && !error && <BurgerConstructor />}</div>
      </div>
    </DndProvider>
  );
}