import { getOrderQuery, orderQuery } from "../actions";
import { closeOrder, initialState, orderSlice } from "./order-slice";

const mockOrder = {
  _id: "66b65793119d45001b4fecd6",
  ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093c"],
  owner: "66b4ddcc119d45001b4fe744",
  status: "done",
  name: "Краторный био-марсианский бургер",
  createdAt: "2024-08-09T17:53:23.920Z",
  updatedAt: "2024-08-09T17:53:24.441Z",
  number: 49110,
  __v: 0,
};

describe("order reducer", () => {
  it("init", () => {
    const state = orderSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("closeOrder", () => {
    const state = orderSlice.reducer(initialState, { type: closeOrder.type });
    expect(state).toEqual({ ...initialState, loading: false, order: { number: null } });
  });

  it("orderQuery.fulfilled", () => {
    const action = {
      type: orderQuery.fulfilled.type,
      payload: { name: "Флюоресцентный био-марсианский бургер", success: true, order: { number: 49109 } },
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...action.payload, loading: false, error: false });
  });

  it("orderQuery.pending", () => {
    const action = {
      type: orderQuery.pending.type,
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it("orderQuery.rejected", () => {
    const action = {
      type: orderQuery.rejected.type,
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: true, loading: false, show: true });
  });

  it("getOrderQuery.fulfilled", () => {
    const action = { type: getOrderQuery.fulfilled.type, payload: { orders: [mockOrder] } };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, selectedOrder: mockOrder });
  });
});
