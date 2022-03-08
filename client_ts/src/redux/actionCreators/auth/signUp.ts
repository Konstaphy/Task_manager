import { ApiService } from "../../../service/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignUpRequest } from "../../../../../models/http/signUp";
import UserDTO from "../../../../../models/dtos/userDTO";

export const signUp = createAsyncThunk(
    "user/signUp",
    async (userData: SignUpRequest): Promise<UserDTO> => {
        const user = await ApiService.SignUp(userData);
        localStorage.setItem("token", user.accessToken);
        return user.user;
    }
);
