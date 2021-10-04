import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost/5000',
    withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.auth = `Bearer ${localStorage.getItem('token')}`
    return config
})

axiosInstance.interceptors.response.use((config) => {
    return config
}, async (error) => {
    throw error
})