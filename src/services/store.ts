import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { tabSlice } from "./slices/tab-slice";
import { ingredientsSlice } from "./slices/ingredients-slice";
import { constructorSlice } from "./slices/constructor-slice";
import { orderSlice } from "./slices/order-slice";
import { userSlice } from "./slices/user-slice";
import { feedApi } from "./feed/api";
import { useSelector as SelectorHook, useDispatch as dispatchHook } from "react-redux";
import { ordersApi } from "./orders/api";

export const store = configureStore({
  reducer: combineReducers({
    [ordersApi.reducerPath]: ordersApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
    [tabSlice.reducerPath]: tabSlice.reducer,
    [constructorSlice.reducerPath]: constructorSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedApi.middleware, ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TypeRootStore = ReturnType<typeof store.getState>;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = SelectorHook.withTypes<RootState>();
