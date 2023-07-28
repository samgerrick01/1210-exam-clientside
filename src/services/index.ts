import axios from 'axios'
import { FormModel, TaskModel } from '../models'

const API_URL = 'http://localhost:5000'

export const addTask = async (task: FormModel) => {
    const res = await axios.post(`${API_URL}/add-task`, task)
    return res.data
}

export const getTasks = async (email: any) => {
    const res = await axios.post(`${API_URL}/tasks`, email)
    return res.data
}

export const getTrash = async (email: any) => {
    const res = await axios.post(`${API_URL}/trash`, email)
    return res.data
}

export const changeStatus = async (id: number, status: string) => {
    const res = await axios.put(`${API_URL}/changeStatus`, { id, status })
    return res.data
}

export const moveToTrash = async (task: TaskModel) => {
    const res = await axios.post(`${API_URL}/moveToTrash`, task)
    return res.data
}

export const updateTask = async (id: number, task_name: string) => {
    const res = await axios.put(`${API_URL}/updateTask`, { id, task_name })
    return res.data
}

export const deleteTrash = async (email: any) => {
    const res = await axios.post(`${API_URL}/deleteTrash`, email)
    return res.data
}

export const signInUser = async (credentials: any) => {
    const res = await axios.post(`${API_URL}/login`, credentials)
    return res.data
}

export const signUpUser = async (credentials: any) => {
    const res = await axios.post(`${API_URL}/signup`, credentials)
    return res.data
}
