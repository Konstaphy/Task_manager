import axios from "axios";

require('dotenv').config()

const api = axios.create({
    withCredentials: true,
    headers: {
        "Authorisation": `Bearer ${localStorage.getItem('token')}`
    },
    baseURL: process.env.API_URL
})

export const login = async (username: string, password: string) => {
    return await api.post('/login', {username: username, password: password}).then((res) => {
        return (res.data)
    })
}

export const registration = async (username: string, password: string, email: string) => {
    return await api.post('/registration', {username: username, password: password, email: email}).then((res) => {
        return (res.data)
    })
}



