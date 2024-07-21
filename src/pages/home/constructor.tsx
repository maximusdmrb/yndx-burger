import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import styles from "./constructor.module.scss";
import { useSelector } from "../../hooks/use-typed-selector";

import Typography from "../../components/typography/typography";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CenterLayout from "../../layout/center-layout";

export default function Constructor() {
  const { isLoading, ingredients, error } = useSelector((store) => store.ings);

  if (isLoading && !ingredients.length)
    return (
      <CenterLayout>
        <img src="/loader.svg" alt="loading..." />
      </CenterLayout>
    );
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.grid + " pb-10 "}>
        <div className={styles.col + " pt-10"}>
          <Typography variant="large">{error || "Соберите бургер"}</Typography>
          {!isLoading && !error && <BurgerIngredients ingredients={ingredients} />}
        </div>
        <div className={styles.col + " pl-4 pt-25"}>{!isLoading && !error && <BurgerConstructor />}</div>
      </div>
    </DndProvider>
  );
}
