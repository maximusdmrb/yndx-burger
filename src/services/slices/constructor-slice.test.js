import { nanoid } from "@reduxjs/toolkit";
import {
  addIngredient,
  clearBurger,
  constructorSlice,
  initialState,
  removeIngredient,
  setBun,
  setDragIngredient,
  sortIngredients,
} from "./constructor-slice";

const ingredient = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

describe("constructor reducer", () => {
  it("initializes correctly", () => {
    const state = constructorSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("add ingedient", () => {
    const action = { type: addIngredient.type, payload: ingredient };
    const state = constructorSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, selectedIngredients: [ingredient] });
  });

  it("current drag ingredient", () => {
    const action = { type: setDragIngredient.type, payload: ingredient };
    const state = constructorSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, dragIngredient: ingredient });
  });

  it("current bun", () => {
    const action = { type: setBun.type, payload: ingredient };
    const state = constructorSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, bun: ingredient });
  });

  it("remove ingredient", () => {
    const prevState = { ...initialState, selectedIngredients: [ingredient] };
    const action = { type: removeIngredient.type, payload: ingredient.id };
    const state = constructorSlice.reducer(prevState, action);
    expect(state).toEqual(initialState);
  });

  it("sort ingredients", () => {
    const action = { type: sortIngredients.type, payload: { fromIndex: 0, toIndex: 1 } };
    const state = constructorSlice.reducer({ ...initialState, selectedIngredients: [0, 1, 2] }, action);
    expect(state).toEqual({ ...initialState, selectedIngredients: [1, 0, 2] });
  });
  it("clear burger", () => {
    const action = { type: clearBurger.type };
    const state = constructorSlice.reducer(
      { bun: true, selectedIngredients: [0, 1, 2], dragIngredient: ingredient },
      action
    );
    expect(state).toEqual({
      bun: null,
      selectedIngredients: [],
      dragIngredient: null,
    });
  });
});
