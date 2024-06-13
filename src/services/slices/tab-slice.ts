import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryIngredient } from "../../components/tabs/tabs";

export const tabSlice = createSlice({
  name: "tab",
  initialState: "bun",
  reducers: {
    switchTab(state, action: PayloadAction<CategoryIngredient>) {
      state = action.payload;
      return state;
    },
  },
});

export const { switchTab } = tabSlice.actions;
