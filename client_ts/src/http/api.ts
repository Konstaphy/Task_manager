import axios from "axios";

require('dotenv').config()

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.API_URL
})

api.defaults.headers.common['authorisation'] = `Bearer ${localStorage.getItem('token')}`

export const login = async (username: string, password: string) => {
    return await api.post('/login', {username: username, password: password})
        .then((res) => {
            localStorage.setItem('token', res.data.accessToken)
            return (res.data)
        })
}

export const registration = async (username: string, password: string, email: string) => {
    return await api.post('/registration', {username: username, password: password, email: email})
        .then((res) => {
            localStorage.setItem('token', res.data.accessToken)
            return (res.data)
        })
}

export const refresh = async () => {
    return await api.get('/refresh').then((res) => {
        return (res.data)
    })
}



