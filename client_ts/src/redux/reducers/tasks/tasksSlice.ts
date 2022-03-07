import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskResponseDTO } from "../../../../../models/taskResponseDTO";
import { createTask } from "../../actionCreators/createTask";
import UserDTO from "../../../../../models/userDTO";
import { stat } from "fs";

interface TasksState {
    tasks?: TaskResponseDTO[];
}

const initialState: TasksState = {
    tasks: undefined,
};

export const TasksStore = createSlice({
    name: "user",
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<TaskResponseDTO>) {
            state.tasks?.push(action.payload);
        },
        setTasks(state, action: PayloadAction<TaskResponseDTO[]>) {
            state.tasks = [...action.payload];
        },
    },
    extraReducers: {
        [createTask.fulfilled.type]: (state, action: PayloadAction<TaskResponseDTO | undefined>) => {
            if (!state.tasks) state.tasks = [];
            if (action.payload) state.tasks.push(action.payload);
        },
    },
});
