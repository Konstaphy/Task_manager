import axios from "axios";
import { Endpoints } from "./endpoints";
import { User } from "../../../../dtos/userDTO";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/",
    withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

export class ApiService {
    public static GetCurrent = async (): Promise<User> => {
        const token = await axiosInstance.get(Endpoints.Refresh);
        localStorage.setItem("refreshToken", token.data.refresh_token);
        return token.data.user;
    };
}
