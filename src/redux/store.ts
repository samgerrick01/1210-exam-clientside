import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './taskSlice'
import loadingSlice from './loadingSlice'

export const store = configureStore({
    reducer: {
        tasks: taskSlice,
        loading: loadingSlice,
    },
})
