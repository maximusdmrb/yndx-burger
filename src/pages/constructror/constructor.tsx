import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { TypesIngredient } from "../../components/tabs/tabs";
import styles from "./constructor.module.scss";
import data from "./data.json";

export interface Ingredient {
  _id: string;
  name: string;
  type: TypesIngredient;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export default function Constructor() {
  return (
    <div className={styles.grid + " pb-10 "}>
      <div className={styles.col + " pt-10"}>
        <BurgerIngredients data={data as Ingredient[]} />
      </div>
      <div className={styles.col + " pl-4 pt-25"}>
        <BurgerConstructor selectedIngredinets={data.slice(0, 7) as Ingredient[]} />
      </div>
    </div>
  );
}
