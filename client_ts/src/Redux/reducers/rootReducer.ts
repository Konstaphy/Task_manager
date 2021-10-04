import {combineReducers} from "redux";
import {authReducer} from "./authReducer";

export const RootReducer = combineReducers({auth: authReducer})

export type RootState = ReturnType<typeof RootReducer>