import { ApiService } from "../../service/api/apiService";
import { AppDispatch } from "../store";
import { UserStore } from "../reducers/user/userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const GetCurrent = () => async (dispatch: AppDispatch): Promise<void> => {
//     try {
//         const { setUser } = UserStore.actions;
//         const data = await ApiService.GetCurrent();
//         localStorage.setItem("refreshToken", data.refresh_token);
//         console.log(data.user);
//         dispatch(setUser(data.user));
//     } catch (e) {
//         console.log(e);
//     }
// };
export const GetCurrent = createAsyncThunk("user/getCurrent", async () => {
    const data = await ApiService.GetCurrent();
    localStorage.setItem("refreshToken", data.refresh_token);
    return data.user;
});
