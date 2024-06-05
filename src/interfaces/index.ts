import { CategoryIngredient } from "../components/tabs/tabs";

export interface Ingredient {
  _id: string;
  name: string;
  type: CategoryIngredient;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  nanoid: string;
}

export type RegisterData = { email: string; name: string; password: string };
export type LoginData = Pick<RegisterData, "email" | "password">;
export type EmailData = Pick<LoginData, "email">;
export type ResetData = { password: string; token: string };
