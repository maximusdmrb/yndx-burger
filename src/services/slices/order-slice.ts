import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { Order } from "../../types";

export const orderQuery = createAsyncThunk("order/orderQuery", async (ingredients: string[]) => {
  return api.order(ingredients);
});
export const getOrderQuery = createAsyncThunk("order/getOrderQuery", async (number: string) => {
  return api.getOrder(number);
});

interface IStoreOrder {
  name: string;
  order: {
    number: null | number | string;
  };
  success: boolean;
  loading: boolean;
  error: boolean;
  selectedOrder?: Order | null;
}

const initialState: IStoreOrder = {
  name: "",
  order: {
    number: null,
  },
  success: false,
  loading: false,
  error: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    closeOrder: (state) => {
      state.loading = false;
      state.order.number = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(orderQuery.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(orderQuery.fulfilled, (_, action: PayloadAction<IStoreOrder>) => {
      return { ...action.payload, loading: false, error: false };
    });
    builder.addCase(orderQuery.rejected, (state) => {
      return {
        ...state,
        error: true,
        loading: false,
        show: true,
      };
    });

    builder.addCase(
      getOrderQuery.fulfilled,
      (state, action: PayloadAction<{ orders: Order[] }>) => {
        console.log(action.payload);

        return { ...state, selectedOrder: action.payload.orders[0] };
      },
    );
  },
});

export const { closeOrder } = orderSlice.actions;
