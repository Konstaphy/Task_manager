import { ApiService } from "../../service/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrent = createAsyncThunk("user/getCurrent", async () => {
    const data = await ApiService.GetCurrent();
    localStorage.setItem("refreshToken", data.refresh_token);
    return data.user;
});
