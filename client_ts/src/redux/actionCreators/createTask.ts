import { ApiService } from "../../service/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskRequestDTO } from "../../../../models/taskDTO";

export const createTask = createAsyncThunk("tasks/createTask", async (task: TaskRequestDTO) => {
    return await ApiService.CreateTask(task);
});
