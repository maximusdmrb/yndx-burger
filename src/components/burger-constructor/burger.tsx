import styles from "./burger-constructor.module.scss";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useDrop } from "react-dnd";
import { store } from "../../services/store";
import { addIngredient } from "../../services/slices/constructor-slice";
import { Ingredient } from "../../interfaces";
import Bun from "./bun";
import IngredientElement from "./ingredient";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Typography from "../typography/typography";

export default function Burger() {
  const [{ isOver }, targetOther] = useDrop({
    accept: "other",
    drop(ingredient: Ingredient) {
      !ingredient.nanoid && store.dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const { dragIngredient, selectedIngredients } = useTypedSelector((store) => store.burger);
  const className = dragIngredient && !dragIngredient.nanoid && dragIngredient?.type !== "bun" ? (isOver ? "glowover" : "glow") : "";

  return (
    <div className={`${styles.burger} `}>
      <Bun />
      <div ref={targetOther} className={`${styles.list} ${styles.scroll} custom-scroll ${className}`}>
        {selectedIngredients.length ? (
          selectedIngredients.map((selected, index) => <IngredientElement sortIndex={index} key={selected.nanoid} ingredient={selected} />)
        ) : (
          <div className="constructor-element noselect center nodrag" data-plug>
            <Typography className="flex center">
              <BurgerIcon type="secondary" /> Добавьте и другие ингредиенты
            </Typography>
          </div>
        )}
      </div>
      <Bun pos="bottom" />
    </div>
  );
}
