import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskDTO } from "../../../../../models/dtos/taskDTO";
import { createTask } from "../../actionCreators/tasks/createTask";
import { getTasks } from "../../actionCreators/tasks/getAllTasks";

export enum TasksPages {
    active = "Active task",
    new = "New task",
}

interface TasksState {
    tasks?: TaskDTO[];
    currentPage: TasksPages;
    activeTaskIndex?: number;
}

const initialState: TasksState = {
    currentPage: TasksPages.new,
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
    extraReducers: {
        [createTask.fulfilled.type]: (state, action: PayloadAction<TaskDTO | undefined>) => {
            if (!state.tasks) state.tasks = [];
            if (action.payload) state.tasks.push(action.payload);
        },
        [getTasks.fulfilled.type]: (state, action: PayloadAction<TaskDTO[] | undefined>) => {
            if (action.payload) state.tasks = action.payload;
        },
    },
});
