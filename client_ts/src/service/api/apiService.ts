import axios from "axios";
import { Endpoints } from "./endpoints";
import UserDTO, { UserFromDB } from "../../../../models/userDTO";
import { TaskRequestDTO, TaskResponseDTO } from "../../../../models/taskResponseDTO";
import { RefreshApiResponse } from "../../../../models/refresh";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/",
    withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

export class ApiService {
    // AUTH
    public static GetCurrent = async (): Promise<RefreshApiResponse> => {
        const data = await axiosInstance.get(Endpoints.Refresh);
        return data.data;
    };
    public static Login = async (name: string, password: string): Promise<UserDTO> => {
        const token = await axiosInstance.post(Endpoints.Login, { name, password });
        console.log(token);
        localStorage.setItem("refreshToken", token.data.refresh_token);
        return token.data.user;
    };
    public static Logout = async (): Promise<void> => {
        await axiosInstance.get(Endpoints.Logout);
    };

    // TASKS
    public static GetTasks = async (userId?: number): Promise<TaskResponseDTO[]> => {
        if (!userId) return [];
        const tasks = await axiosInstance.get(`${Endpoints.Task}/${userId}`);
        return tasks.data;
    };
    public static CreateTask = async (task: TaskRequestDTO): Promise<TaskResponseDTO> => {
        const putTask = await axiosInstance.post(Endpoints.CreateTask, task);
        return putTask.data;
    };
}
