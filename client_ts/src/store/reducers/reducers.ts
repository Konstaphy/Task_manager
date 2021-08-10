import {combineReducers} from "redux";
import {authReducer} from "./authReducer";

export const root = combineReducers({
    auth: authReducer
})

export type RootState = ReturnType<typeof root>