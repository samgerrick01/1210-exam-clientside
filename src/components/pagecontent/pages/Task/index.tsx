import { FC, useEffect, useState } from 'react'
import { Typography, Input } from 'antd'
import { getTasks } from '../../../../services'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAllTask,
    sortByDateTask,
    sortByDateTaskRev,
} from '../../../../redux/taskSlice'
import TaskList from './TaskList'
import { FaSortDown, FaSortUp } from 'react-icons/fa'

const { Title } = Typography

const index: FC = () => {
    const dispatch = useDispatch()

    const [isDateReverse, setIsDateReverse] = useState<boolean>(false)

    const { tasks } = useSelector((state: any) => state.tasks)

    const [search, setSearch] = useState<string>('')

    const handleAllTask = async () => {
        const res = await getTasks({ email: 'Sam' })
        dispatch(getAllTask(res))
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
            <Title>All Tasks</Title>
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
