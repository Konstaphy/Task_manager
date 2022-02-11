import { combineReducers } from "redux";
import { authReducer } from "redux/reducers/authReducer";
import { tasksReducer } from "redux/reducers/tasksReducer";

export const RootReducer = combineReducers({ auth: authReducer, tasks: tasksReducer });

export type RootState = ReturnType<typeof RootReducer>;
