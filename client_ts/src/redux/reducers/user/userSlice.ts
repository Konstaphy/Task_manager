import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserDTO from "../../../../../models/userDTO";
import { getCurrent } from "../../actionCreators/getCurrent";
import { login } from "../../actionCreators/login";
import { logout } from "../../actionCreators/logout";

interface UserState {
    user?: UserDTO;
}

const initialState: UserState = {
    user: undefined,
};

export const UserStore = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserDTO | undefined>) {
            state.user = action.payload;
        },
    },
    extraReducers: {
        [getCurrent.fulfilled.type]: (state, action: PayloadAction<UserDTO | undefined>) => {
            state.user = action.payload;
        },
        [login.fulfilled.type]: (state, action: PayloadAction<UserDTO | undefined>) => {
            state.user = action.payload;
        },
        [logout.fulfilled.type]: state => {
            state.user = undefined;
        },
    },
});
