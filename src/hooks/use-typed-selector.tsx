import { useSelector as SelectorHook, useDispatch as dispatchHook } from "react-redux";
import { AppDispatch, RootState, store } from "../services/store";

export type TypeRootStore = ReturnType<typeof store.getState>;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = SelectorHook.withTypes<RootState>();
