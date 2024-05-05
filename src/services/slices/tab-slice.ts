import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
  name: "tab",
  initialState: "bun",
  reducers: {
    switchTab(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { switchTab } = tabSlice.actions;
