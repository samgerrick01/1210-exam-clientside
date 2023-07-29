import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './taskSlice'
import loadingSlice from './loadingSlice'

export const store = configureStore({
    reducer: {
        tasks: taskSlice,
        loading: loadingSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
