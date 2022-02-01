import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { tasksReducer } from "./tasksReducer";

export const RootReducer = combineReducers({ auth: authReducer, tasks: tasksReducer });

export type RootState = ReturnType<typeof RootReducer>;
