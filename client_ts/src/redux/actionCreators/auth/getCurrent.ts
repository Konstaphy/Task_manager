import { ApiService } from "../../../service/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrent = createAsyncThunk("user/getCurrent", async () => {
    const data = await ApiService.GetCurrent();
    if (data) {
        localStorage.setItem("token", data.accessToken);
        return data.user;
    }
});
