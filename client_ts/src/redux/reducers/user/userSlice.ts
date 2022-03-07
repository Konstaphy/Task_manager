import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserDTO from "../../../../../dtos/userDTO";
import { GetCurrent } from "../../actionCreators/refresh";

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
        [GetCurrent.fulfilled.type]: (state, action: PayloadAction<UserDTO | undefined>) => {
            console.log(action.payload);
            state.user = action.payload;
        },
    },
});
