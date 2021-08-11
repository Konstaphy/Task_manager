import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {taskReducer} from "./tasksReducer";

export const root = combineReducers({
    auth: authReducer,
    tasks: taskReducer
})

export type RootState = ReturnType<typeof root>