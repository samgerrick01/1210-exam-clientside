import axios from 'axios'
import { FormModel, TaskModel } from '../models'

// const API_URL = 'http://localhost:5000'
const API_URL = 'https://kind-sweatshirt-seal.cyclic.app'

export const addTask = async (task: FormModel, token: string) => {
    try {
        const res = await axios.post(`${API_URL}/add-task`, task, {
            headers: {
                Authorization: token,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getTasks = async (email: { email: string }, token: string) => {
    try {
        const res = await axios.post(`${API_URL}/tasks`, email, {
            headers: {
                Authorization: token,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getTrash = async (email: { email: string }, token: string) => {
    try {
        const res = await axios.post(`${API_URL}/trash`, email, {
            headers: {
                Authorization: token,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const changeStatus = async (
    id: number,
    status: string,
    token: string,
) => {
    try {
        const res = await axios.put(
            `${API_URL}/changeStatus`,
            { id, status },
            {
                headers: {
                    Authorization: token,
                },
            },
        )
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const moveToTrash = async (task: TaskModel, token: string) => {
    try {
        const res = await axios.post(`${API_URL}/moveToTrash`, task, {
            headers: {
                Authorization: token,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateTask = async (
    id: number,
    task_name: string,
    token: string,
) => {
    try {
        const res = await axios.put(
            `${API_URL}/updateTask`,
            { id, task_name },
            {
                headers: {
                    Authorization: token,
                },
            },
        )
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteTrash = async (email: { email: string }, token: string) => {
    try {
        const res = await axios.post(`${API_URL}/deleteTrash`, email, {
            headers: {
                Authorization: token,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const signInUser = async (credentials: {
    email: string
    password: string
}) => {
    try {
        const res = await axios.post(`${API_URL}/login`, credentials)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const signUpUser = async (credentials: {
    email: string
    password: string
    nickname: string
    confirm_password: string
}) => {
    try {
        const res = await axios.post(`${API_URL}/signup`, credentials)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
