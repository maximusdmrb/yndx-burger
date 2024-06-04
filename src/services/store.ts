import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { tabSlice } from "./slices/tab-slice";
import { ingredientsSlice } from "./slices/ingredients-slice";
import { constructorSlice } from "./slices/constructor-slice";
import { orderSlice } from "./slices/order-slice";
import { userSlice } from "./slices/user-slice";

export const store = configureStore({
  reducer: combineReducers({
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
    [tabSlice.reducerPath]: tabSlice.reducer,
    [constructorSlice.reducerPath]: constructorSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  }),
});
export type TypeRootStore = ReturnType<typeof store.getState>;
