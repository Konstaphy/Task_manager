import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
    error?: string;
    warning?: string;
    fetching?: boolean;
}

const initialState: CommonState = {
    error: undefined,
    warning: undefined,
    fetching: false,
};

export const CommonStore = createSlice({
    name: "common",
    initialState,
    reducers: {
        setFetched(state, action: PayloadAction<boolean>) {
            state.fetching = action.payload;
        },
    },
});
