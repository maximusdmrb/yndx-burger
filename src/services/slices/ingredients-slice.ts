import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { Ingredient } from "../../interfaces";
import { ingredientsQuery } from "../actions";

interface IStoreIngredients {
  ingredients: Ingredient[];
  isLoading: boolean;
  error: null | string;
}
export const initialState: IStoreIngredients = {
  ingredients: [],
  isLoading: true,
  error: null,
};
export const ingredientsSlice = createSlice({
  name: "ings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /*  ingredientsQuery */
    builder.addCase(ingredientsQuery.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(ingredientsQuery.fulfilled, (state, action: PayloadAction<{ data: Ingredient[] }>) => {
      state.ingredients = action.payload.data;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(ingredientsQuery.rejected, (state, action: { error: SerializedError }) => {
      state.error = action.error?.message ?? "Прозошла неизвестная ошибка";
      state.isLoading = false;
    });
  },
});
