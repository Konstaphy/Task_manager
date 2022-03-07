import axios from "axios";
import { Endpoints } from "./endpoints";
import UserDTO, { UserFromDB } from "../../../../models/userDTO";
import { TaskRequestDTO, TaskResponseDTO } from "../../../../models/taskResponseDTO";
import { RefreshApiResponse } from "../../../../models/refresh";
import { LoginRequest } from "../../../../models/login";

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
        const user = await axiosInstance.get(Endpoints.Refresh);
        return user.data;
    };
    public static Login = async (userData: LoginRequest): Promise<RefreshApiResponse> => {
        const user = await axiosInstance.post(Endpoints.Login, userData);
        return user.data;
    };
    public static Logout = async (): Promise<void> => {
        await axiosInstance.post(Endpoints.Logout);
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
