import { ingredientsQuery } from "../actions";
import {} from "../api";
import { initialState, ingredientsSlice } from "./ingredients-slice";

jest.mock("axios");

const mockIngredients = [
  {
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
  },
  {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
  },
];

describe("get ingredients test", () => {
  it("init ingredients", () => {
    const state = ingredientsSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("ingredientsQuery.pending", () => {
    const action = { type: ingredientsQuery.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true, error: null });
  });

  it("ingredientsQuery.fullfilled", () => {
    const action = { type: ingredientsQuery.fulfilled.type, payload: { data: mockIngredients } };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ isLoading: false, error: null, ingredients: mockIngredients });
  });

  it("ingredientsQuery.reject", () => {
    const action = { type: ingredientsQuery.rejected.type, error: { message: "Ошибка" } };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false, error: "Ошибка" });
  });

  it("ingredientsQuery.reject unknow error", () => {
    const action = { type: ingredientsQuery.rejected.type, error: null };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false, error: "Прозошла неизвестная ошибка" });
  });
});
