import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TypeRootStore } from "../services/store";

export const useTypedSelector: TypedUseSelectorHook<TypeRootStore> = useSelector;
