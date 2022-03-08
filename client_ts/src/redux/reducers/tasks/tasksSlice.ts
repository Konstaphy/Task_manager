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
    activeTaskId?: number;
}

const initialState: TasksState = {
    currentPage: TasksPages.new,
};

export const TasksStore = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setCurrent(state, action: PayloadAction<number | undefined>) {
            state.activeTaskId = action.payload;
            if (action.payload) {
                state.currentPage = TasksPages.active;
            } else {
                state.currentPage = TasksPages.new;
            }
        },
    },
    extraReducers: {
        [createTask.fulfilled.type]: (state, action: PayloadAction<TaskDTO | undefined>) => {
            if (!state.tasks) state.tasks = [];
            console.log(action.payload);
            if (action.payload) state.tasks.push(action.payload);
        },
        [getTasks.fulfilled.type]: (state, action: PayloadAction<TaskDTO[] | undefined>) => {
            if (action.payload) state.tasks = action.payload;
        },
    },
});
