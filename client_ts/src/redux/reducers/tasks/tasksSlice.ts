import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskDTO } from "../../../../../dtos/taskDTO";

interface TasksState {
    tasks?: TaskDTO[];
}

const initialState: TasksState = {
    tasks: undefined,
};

export const TasksStore = createSlice({
    name: "user",
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<TaskDTO>) {
            state.tasks?.push(action.payload);
        },
        setTasks(state, action: PayloadAction<TaskDTO[]>) {
            state.tasks = [...action.payload];
        },
    },
});
