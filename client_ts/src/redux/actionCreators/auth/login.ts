import { ApiService } from "../../../service/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRequest } from "../../../../../models/http/login";
import UserDTO from "../../../../../models/dtos/userDTO";

export const login = createAsyncThunk(
    "user/login",
    async (userData: LoginRequest): Promise<UserDTO> => {
        const user = await ApiService.Login(userData);
        localStorage.setItem("token", user.accessToken);
        return user.user;
    }
);
