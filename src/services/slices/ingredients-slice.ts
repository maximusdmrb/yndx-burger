import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { Ingredient } from "../../interfaces";

export const ingredientsQuery = createAsyncThunk("ings/getIngs", async () => {
  return api.getIngredients();
});

interface IStoreIngredients {
  ingredients: Ingredient[];
  isLoading: boolean;
  error: null | string;
}
const initialState: IStoreIngredients = {
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
    builder.addCase(ingredientsQuery.fulfilled, (state, action) => {
      state.ingredients = action.payload.data;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(ingredientsQuery.rejected, (state, action) => {
      state.error = action.error.message ?? "Прозошла неизвестная ошибка";
      state.isLoading = false;
    });
  },
});
