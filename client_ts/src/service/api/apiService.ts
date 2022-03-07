import axios from "axios";
import { Endpoints } from "./endpoints";
import UserDTO, { UserFromDB } from "../../../../dtos/userDTO";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/",
    withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

export class ApiService {
    public static GetCurrent = async (): Promise<UserDTO> => {
        const token = await axiosInstance.get(Endpoints.Refresh);
        console.log(token);
        localStorage.setItem("refreshToken", token.data.refresh_token);
        return token.data.user;
    };
    public static Login = async (name: string, password: string): Promise<UserDTO> => {
        const token = await axiosInstance.post(Endpoints.Login, { name, password });
        console.log(token);
        localStorage.setItem("refreshToken", token.data.refresh_token);
        return token.data.user;
    };
}
