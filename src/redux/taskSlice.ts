import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskModel } from '../models'
import { orderBy } from 'lodash'

interface InitialState {
    tasks: TaskModel[]
    trash: TaskModel[]
}

const initialState: InitialState = {
    tasks: [],
    trash: [],
}
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        getAllTask(state, action: PayloadAction<TaskModel[]>) {
            return {
                ...state,
                tasks: orderBy(action.payload, ['created_date'], ['asc']),
            }
        },
        getAllTrash(state, action: PayloadAction<TaskModel[]>) {
            return {
                ...state,
                trash: orderBy(action.payload, ['created_date'], ['asc']),
            }
        },
        sortByDateTask(state) {
            return {
                ...state,
                tasks: orderBy(state.tasks, ['created_date'], ['desc']),
            }
        },
        sortByDateTaskRev(state) {
            return {
                ...state,
                tasks: orderBy(state.tasks, ['created_date'], ['asc']),
            }
        },
        sortByDateTrash(state) {
            return {
                ...state,
                trash: orderBy(state.trash, ['created_date'], ['desc']),
            }
        },
        sortByDateTrashRev(state) {
            return {
                ...state,
                trash: orderBy(state.trash, ['created_date'], ['asc']),
            }
        },
        clearAllState(state) {
            return {
                ...state,
                tasks: [],
                trash: [],
            }
        },
    },
})

export const {
    getAllTask,
    sortByDateTask,
    sortByDateTaskRev,
    getAllTrash,
    sortByDateTrash,
    sortByDateTrashRev,
    clearAllState,
} = taskSlice.actions

export default taskSlice.reducer
