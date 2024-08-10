import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types";
import { getOrderQuery, orderQuery } from "../actions";

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

export const initialState: IStoreOrder = {
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

    builder.addCase(getOrderQuery.fulfilled, (state, action: PayloadAction<{ orders: Order[] }>) => {
      return { ...state, selectedOrder: action.payload.orders[0] };
    });
  },
});

export const { closeOrder } = orderSlice.actions;
