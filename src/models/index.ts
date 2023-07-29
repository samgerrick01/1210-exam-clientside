export interface FormModel {
    taskName: string
    status: string
    createdAt: Date
    createdBy: string
}

export interface TaskModel {
    id: number
    task_name: string
    status: string
    created_date: Date
    created_by: string
}

export interface UserModel {
    id: number
    email: string
    nickname: string
    role: string
}
