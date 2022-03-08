import { ApiService } from "../../../service/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId: number): Promise<number> => {
        await ApiService.DeleteTask(taskId);
        return taskId;
    }
);
