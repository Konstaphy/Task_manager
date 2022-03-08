import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserDTO from "../../../../../models/dtos/userDTO";
import { getCurrent } from "../../actionCreators/auth/getCurrent";
import { login } from "../../actionCreators/auth/login";
import { logout } from "../../actionCreators/auth/logout";
import { signUp } from "../../actionCreators/auth/signUp";

interface UserState {
    user?: UserDTO;
    fetching?: string;
    error?: string;
}

const initialState: UserState = {};

export const UserStore = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserDTO | undefined>) {
            state.user = action.payload;
        },
    },
    extraReducers: {
        // Refresh
        [getCurrent.pending.type]: state => {
            state.fetching = "Loading current session";
        },
        [getCurrent.fulfilled.type]: (state, action: PayloadAction<UserDTO | undefined>) => {
            state.fetching = undefined;
            state.user = action.payload;
        },
        [getCurrent.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        // Login
        [login.pending.type]: state => {
            state.fetching = "Loading your account";
        },
        [login.fulfilled.type]: (state, action: PayloadAction<UserDTO | undefined>) => {
            state.fetching = undefined;
            state.user = action.payload;
        },
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        // SignUp
        [signUp.pending.type]: state => {
            state.fetching = "Loading your new account";
        },
        [signUp.fulfilled.type]: (state, action: PayloadAction<UserDTO | undefined>) => {
            state.fetching = undefined;
            state.user = action.payload;
        },
        [signUp.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        // Logout
        [logout.fulfilled.type]: state => {
            state.user = undefined;
        },
    },
});
