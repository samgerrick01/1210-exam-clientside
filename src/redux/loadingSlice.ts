import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    load: boolean
}

const initialState: InitialState = {
    load: false,
}
const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        loadingOn(state) {
            return {
                ...state,
                load: true,
            }
        },
        loadingOff(state) {
            return {
                ...state,
                load: false,
            }
        },
    },
})

export const { loadingOn, loadingOff } = loadingSlice.actions

export default loadingSlice.reducer
