import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Ingredient } from "../../interfaces";

interface IStoreBurger {
  bun: Ingredient | null;
  selectedIngredients: Ingredient[];
  dragIngredient: Ingredient | null;
}
const initialState: IStoreBurger = {
  bun: null,
  selectedIngredients: [],
  dragIngredient: null,
};
export const constructorSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action) {
        state.selectedIngredients.unshift(action.payload);
      },
      prepare(ingredient): any {
        return { payload: { ...ingredient, nanoid: nanoid() } };
      },
    },
    setDragIngredient(state, action) {
      state.dragIngredient = action.payload;
    },
    setBun(state, action) {
      state.bun = action.payload;
    },
    removeIngredient(state, action) {
      state.selectedIngredients = state.selectedIngredients.filter((ing) => ing.nanoid != action.payload);
    },
    sortIngredients(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const fromEl = state.selectedIngredients[fromIndex];
      state.selectedIngredients[fromIndex] = state.selectedIngredients[toIndex];
      state.selectedIngredients[toIndex] = fromEl;
    },
    clearBurger() {
      return initialState;
    },
  },
});

export const { clearBurger, sortIngredients, removeIngredient, addIngredient, setDragIngredient, setBun } = constructorSlice.actions;
