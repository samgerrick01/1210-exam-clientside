import { FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { getTasks } from '../../../../services'
import {
    getAllTask,
    sortByDateTask,
    sortByDateTaskRev,
} from '../../../../redux/taskSlice'
import TaskList from './TaskList'
import { FaSortDown, FaSortUp } from 'react-icons/fa'
import { useAuthUser } from 'react-auth-kit'
import { loadingOff, loadingOn } from '../../../../redux/loadingSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/app'

const index: FC = () => {
    const dispatch = useAppDispatch()
    const authUser = useAuthUser()

    const [isDateReverse, setIsDateReverse] = useState<boolean>(false)

    const { tasks } = useAppSelector((state) => state.tasks)

    const [search, setSearch] = useState<string>('')

    const handleAllTask = async () => {
        dispatch(loadingOn())
        const res = await getTasks(
            { email: authUser()?.user?.email },
            authUser()?.token,
        )
        dispatch(getAllTask(res))
        dispatch(loadingOff())
    }

    const handleSort = () => {
        if (!isDateReverse) {
            dispatch(sortByDateTask())
            setIsDateReverse(!isDateReverse)
        } else {
            dispatch(sortByDateTaskRev())
            setIsDateReverse(!isDateReverse)
        }
    }

    useEffect(() => {
        handleAllTask()
    }, [])

    return (
        <div className="tasks">
            <label className="title-task">All Tasks</label>
            <Input
                placeholder="Search Task"
                size="large"
                style={{ textTransform: 'capitalize' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="table">
                <div className="table-header">
                    <div className="table-header-item">Task</div>
                    <div className="table-header-item">Status</div>
                    <div
                        onClick={handleSort}
                        className="table-header-item cursor-pointer"
                    >
                        Created At
                        {isDateReverse ? <FaSortUp /> : <FaSortDown />}
                    </div>
                    <div className="table-header-item">Actions</div>
                </div>

                {tasks.length === 0 && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px',
                        }}
                    >{`No Task`}</div>
                )}
                {tasks.length > 0 && (
                    <TaskList
                        tasks={tasks}
                        handleAllTask={handleAllTask}
                        search={search}
                    />
                )}
            </div>
        </div>
    )
}

export default index
