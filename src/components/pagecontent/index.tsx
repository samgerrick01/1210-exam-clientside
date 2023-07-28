import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Task from './pages/Task'
import AddTask from './pages/AddTask'
import Trash from './pages/Trash'

const index: FC = () => {
    return (
        <Routes>
            <Route path={`/`} element={<Task />} />
            <Route path={`/add-task`} element={<AddTask />} />
            <Route path={`/deleted-tasks`} element={<Trash />} />
        </Routes>
    )
}

export default index
