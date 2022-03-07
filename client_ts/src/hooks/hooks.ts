import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Dispatch } from "redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = (): Dispatch => useDispatch<AppDispatch>();
