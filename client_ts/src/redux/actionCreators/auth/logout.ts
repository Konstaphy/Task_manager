import { ApiService } from "../../../service/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk("user/logout", async () => {
    const user = await ApiService.Logout();
    localStorage.setItem("token", "");
    return user;
});
