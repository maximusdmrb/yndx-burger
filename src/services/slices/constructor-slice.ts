import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../interfaces";

interface IStoreBurger {
  bun: Ingredient | null;
  selectedIngredients: Ingredient[];
  dragIngredient: Ingredient | null;
}
const initialState: IStoreBurger = {
  bun: JSON.parse(localStorage.getItem("bun") || "null"),
  selectedIngredients: JSON.parse(localStorage.getItem("ingredients") || "[]"),
  dragIngredient: null,
};
export const constructorSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<Ingredient>) {
        state.selectedIngredients.unshift(action.payload);
      },
      prepare(ingredient: Ingredient) {
        return { payload: { ...ingredient, nanoid: nanoid() } };
      },
    },
    setDragIngredient(state, action: PayloadAction<Ingredient | null>) {
      state.dragIngredient = action.payload;
    },
    setBun(state, action: PayloadAction<Ingredient | null>) {
      state.bun = action.payload;
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.selectedIngredients = state.selectedIngredients.filter((ing) => ing.nanoid != action.payload);
    },
    sortIngredients(state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) {
      const { fromIndex, toIndex } = action.payload;
      const fromEl = state.selectedIngredients[fromIndex];
      state.selectedIngredients[fromIndex] = state.selectedIngredients[toIndex];
      state.selectedIngredients[toIndex] = fromEl;
    },
    clearBurger() {
      return {
        bun: null,
        selectedIngredients: [],
        dragIngredient: null,
      };
    },
  },
});

export const { clearBurger, sortIngredients, removeIngredient, addIngredient, setDragIngredient, setBun } = constructorSlice.actions;
