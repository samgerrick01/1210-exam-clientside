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
