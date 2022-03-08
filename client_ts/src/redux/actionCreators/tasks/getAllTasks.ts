import { ApiService } from "../../../service/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskDTO } from "../../../../../models/dtos/taskDTO";

export const getTasks = createAsyncThunk(
    "tasks/getTasks",
    async (userId: number): Promise<TaskDTO[]> => {
        return await ApiService.GetTasks(userId);
    }
);
