import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../Redux/reducers/rootReducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
