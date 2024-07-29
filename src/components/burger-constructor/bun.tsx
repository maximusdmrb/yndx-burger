import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../interfaces";
import { setBun } from "../../services/slices/constructor-slice";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "../../services/store";

const Bun = ({ pos = "top" }: { pos?: "top" | "bottom" }) => {
  const dispatch = useDispatch();

  const handleDropBun = (ingredient: Ingredient) => {
    dispatch(setBun(ingredient));
  };

  const [{ isOver }, targetBun] = useDrop({
    accept: "bun",
    drop(ingredient: Ingredient) {
      handleDropBun(ingredient);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const { bun, dragIngredient } = useSelector((store) => store.burger);
  const className =
    dragIngredient && dragIngredient?.type === "bun" ? (isOver ? "glowover" : "glow") : "";

  return bun ? (
    <div ref={targetBun} className={className}>
      <ConstructorElement
        extraClass="noselect"
        type={pos}
        isLocked
        text={bun.name + (pos === "top" ? " (верх)" : " (низ)")}
        price={bun.price}
        thumbnail={bun.image_mobile}
      />
    </div>
  ) : (
    <div ref={targetBun} className={className}>
      <div className={`constructor-element center noselect constructor-element_pos_${pos}`}>
        <p>Без булочки будет не то...</p>
      </div>
    </div>
  );
};
export default Bun;
