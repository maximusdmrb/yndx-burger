import { removeIngredient, setDragIngredient, sortIngredients } from "../../services/slices/constructor-slice";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../interfaces";
import { useDrag } from "react-dnd";
import { SyntheticEvent, useCallback } from "react";
import { useDispatch, useSelector } from "../../hooks/use-typed-selector";

type IngredientElementProps = { sortIndex: number; ingredient: Ingredient };

export default function IngredientElement({ sortIndex, ingredient }: IngredientElementProps) {
  const dispatch = useDispatch();

  const [{ opacity }, otherRef] = useDrag({
    type: "other",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });
  const handleClose = (nanoid: string) => {
    dispatch(removeIngredient(nanoid));
  };
  const { dragIngredient, selectedIngredients } = useSelector((store) => store.burger);
  const handleOnDrag = useCallback(() => {
    dispatch(setDragIngredient(ingredient));
  }, [setDragIngredient, ingredient]);
  const handleOnDragEnd = () => {
    dispatch(setDragIngredient(null));
  };
  const handleSort = (e: SyntheticEvent<HTMLDivElement>) => {
    if (!dragIngredient?.nanoid) return;
    const [fromIndex, toIndex] = [selectedIngredients.findIndex((ing) => ing.nanoid === dragIngredient.nanoid), Number(e.currentTarget.dataset?.sort)];
    if (toIndex && +toIndex !== fromIndex) dispatch(sortIngredients({ fromIndex, toIndex }));
  };
  return (
    <div draggable ref={otherRef} data-sort={sortIndex} onDragEnd={handleOnDragEnd} onDrag={handleOnDrag} onDragEnter={handleSort} style={{ opacity }}>
      <ConstructorElement extraClass="noselect pointer" text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image_mobile} handleClose={handleClose.bind(null, ingredient.nanoid)} />
    </div>
  );
}
