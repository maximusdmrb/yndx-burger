import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { tabSlice } from "./slices/tab-slice";
import { ingredientsSlice } from "./slices/ingredients-slice";
import { constructorSlice } from "./slices/constructor-slice";
import { orderSlice } from "./slices/order-slice";
import { userSlice } from "./slices/user-slice";
import { feedApi } from "./feed/api";

export const store = configureStore({
  reducer: combineReducers({
    [feedApi.reducerPath]: feedApi.reducer,
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
    [tabSlice.reducerPath]: tabSlice.reducer,
    [constructorSlice.reducerPath]: constructorSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
