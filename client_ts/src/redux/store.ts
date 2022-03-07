import { combineReducers } from "redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { UserStore } from "./reducers/user/userSlice";
import { CommonStore } from "./reducers/commonSlice";

const rootReducer = combineReducers({
    user: UserStore.reducer,
    common: CommonStore.reducer,
});

export const setupStore = (): EnhancedStore => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type RootStore = ReturnType<typeof setupStore>;
export type AppDispatch = RootStore["dispatch"];
