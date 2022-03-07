import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserDTO from "../../../../../models/userDTO";
import { getCurrent } from "../../actionCreators/getCurrent";

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
            console.log(action.payload);
            state.user = action.payload;
        },
    },
});
