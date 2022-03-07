import { combineReducers } from "redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { UserStore } from "./reducers/user/userSlice";
import { CommonStore } from "./reducers/commonSlice";
import { TasksStore } from "./reducers/tasks/tasksSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
    user: UserStore.reducer,
    common: CommonStore.reducer,
    tasks: TasksStore.reducer,
});

export const setupStore = (): EnhancedStore => {
    return configureStore({
        reducer: rootReducer,
    });
};

const store = setupStore();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = (): any => useDispatch<typeof store>();

export type RootState = ReturnType<typeof rootReducer>;
export type RootStore = ReturnType<typeof setupStore>;
export type AppDispatch = RootStore["dispatch"];
