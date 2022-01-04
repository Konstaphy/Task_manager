import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5050',
    withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default axiosInstance