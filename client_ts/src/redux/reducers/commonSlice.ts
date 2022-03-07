import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
    error?: string;
    warning?: string;
    fetching?: string;
}

const initialState: CommonState = {
    error: undefined,
    warning: undefined,
    fetching: undefined,
};

export const CommonStore = createSlice({
    name: "common",
    initialState,
    reducers: {
        setFetched(state, action: PayloadAction<string>) {
            state.fetching = action.payload;
        },
        setErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});
