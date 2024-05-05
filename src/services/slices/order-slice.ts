import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const orderQuery = createAsyncThunk("order/orderQuery", async (ingredients: string[]) => {
  return api.order(ingredients);
});

interface IStoreOrder {
  name: string;
  order: {
    number: null | number | string;
  };
  success: boolean;
  show: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: IStoreOrder = {
  name: "",
  order: {
    number: null,
  },
  success: false,
  show: false,
  loading: false,
  error: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    closeOrder: (state) => {
      state.show = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(orderQuery.pending, (state) => {
      state.loading = true;
      state.show = false;
    });
    builder.addCase(orderQuery.fulfilled, (_, action) => {
      return { ...action.payload, loading: false, show: true, error: false };
    });
    builder.addCase(orderQuery.rejected, (state) => {
      return {
        ...state,
        error: true,
        loading: false,
        show: true,
      };
    });
  },
});

export const { closeOrder } = orderSlice.actions;
