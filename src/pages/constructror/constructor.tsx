import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import styles from "./constructor.module.scss";
import useIngredients from "../../hooks/use-fetch";
import { useMemo } from "react";
import { TypeIngredient } from "../../components/tabs/tabs";

export interface Ingredient {
  _id: string;
  name: string;
  type: TypeIngredient;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  count: number;
  __v: number;
}

export default function Constructor() {
  const { data, loading, error } = useIngredients();

  /* Hardcore: select ingredient  */
  const selectedIngredients = useMemo(() => data.slice(0, 7), [data]);
  /* Add count selected  */
  const ingredients = useMemo(() => data.map((ingredient) => ({ ...ingredient, count: selectedIngredients.filter((select) => select._id === ingredient._id).length })), [data]);

  if (loading) return "Загрузка";
  if (error) return error;
  return (
    <div className={styles.grid + " pb-10 "}>
      <div className={styles.col + " pt-10"}>
        <BurgerIngredients ingredients={ingredients} />
      </div>
      <div className={styles.col + " pl-4 pt-25"}>
        <BurgerConstructor selectedIngredients={selectedIngredients} />
      </div>
    </div>
  );
}
