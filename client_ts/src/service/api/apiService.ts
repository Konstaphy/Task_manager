import axios from "axios";
import { Endpoints } from "./endpoints";
import { TaskRequestDTO, TaskDTO } from "../../../../models/dtos/taskDTO";
import { RefreshApiResponse } from "../../../../models/http/refresh";
import { LoginRequest } from "../../../../models/http/login";
import { SignUpRequest } from "../../../../models/http/signUp";

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
    public static GetCurrent = async (): Promise<RefreshApiResponse | undefined> => {
        try {
            const user = await axiosInstance.get(Endpoints.Refresh).catch(e => console.log(e));
            return user?.data;
        } catch (e) {
            console.log(e);
        }
    };
    public static Login = async (userData: LoginRequest): Promise<RefreshApiResponse> => {
        const user = await axiosInstance.post(Endpoints.Login, userData);
        return user.data;
    };
    public static SignUp = async (userData: SignUpRequest): Promise<RefreshApiResponse> => {
        const user = await axiosInstance.post(Endpoints.SignUp, userData);
        return user.data;
    };
    public static Logout = async (): Promise<void> => {
        await axiosInstance.post(Endpoints.Logout);
    };

    // TASKS
    public static GetTasks = async (userId?: number): Promise<TaskDTO[]> => {
        if (!userId) return [];
        const tasks = await axiosInstance.get(`${Endpoints.Tasks}/${userId}`);
        return tasks.data;
    };
    public static CreateTask = async (task: TaskRequestDTO): Promise<TaskDTO> => {
        const putTask = await axiosInstance.post(Endpoints.CreateTask, task);
        return putTask.data;
    };
    public static DeleteTask = async (taskId: number): Promise<void> => {
        await axiosInstance.post(Endpoints.DeleteTask, { taskId });
    };
}
