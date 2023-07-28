import { FC, useState, useRef, useEffect } from 'react'
import { TaskModel } from '../../../../models'
import moment from 'moment'
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import { changeStatus, moveToTrash, updateTask } from '../../../../services'
import { message, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { loadingOff, loadingOn } from '../../../../redux/loadingSlice'

interface Props {
    task: TaskModel
    handleAllTask: () => Promise<void>
}

const SingleTask: FC<Props> = ({ task, handleAllTask }) => {
    const dispatch = useDispatch()
    const date = moment(task.created_date).format('MMM DD, YYYY, h:mm A')
    const [messageApi, contextHolder] = message.useMessage()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [data, setData] = useState<TaskModel>(task)
    const inputRef = useRef<any>(null)

    const handleDelete = async (task: TaskModel) => {
        dispatch(loadingOn())
        const res = await moveToTrash(task)
        if (res === 'Move to Trash!') {
            dispatch(loadingOff())
            messageApi.success('Move to Trash!', 3)
            handleAllTask()
        }
    }

    const handleEdit = () => {
        setIsEdit(true)
    }

    useEffect(() => {
        inputRef?.current?.focus()
    }, [isEdit])

    const handleSubmitEdit = async () => {
        dispatch(loadingOn())
        const res = await updateTask(data.id, data.task_name)
        if (res === 'Update Successfully!') {
            dispatch(loadingOff())
            setIsEdit(false)
            messageApi.success('Update Successfully!', 3)
            handleAllTask()
        }
    }

    const handleComplete = async (task: TaskModel) => {
        let newStatus = ''
        if (task?.status.toLocaleLowerCase() === 'to do') {
            dispatch(loadingOn())
            newStatus = 'In Progress'
            await changeStatus(task.id, newStatus)
            messageApi.success('Changed!', 3)
            handleAllTask()
            dispatch(loadingOff())
        } else if (task?.status.toLocaleLowerCase() === 'in progress') {
            dispatch(loadingOn())
            newStatus = 'Completed'
            await changeStatus(task.id, newStatus)
            messageApi.success('Changed!', 3)
            handleAllTask()
            dispatch(loadingOff())
        }
    }

    return (
        <div className="table-body">
            {contextHolder}
            <div className="table-body-item">
                {!isEdit ? (
                    task.task_name
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            position: 'relative',
                            width: '90%',
                        }}
                    >
                        <Input
                            size="large"
                            ref={inputRef}
                            style={{ paddingRight: '70px', width: '100%' }}
                            value={data.task_name}
                            onChange={(e) =>
                                setData({ ...data, task_name: e.target.value })
                            }
                        />
                        <button
                            onClick={handleSubmitEdit}
                            className="div-btn cursor-pointer"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
            <div className="table-body-item">{task.status}</div>
            <div className="table-body-item">{date}</div>
            <div className="table-body-item">
                <FaCheck
                    className="icon"
                    onClick={() => handleComplete(task)}
                />
                <FaEdit className="icon" onClick={handleEdit} />
                <FaTrash className="icon" onClick={() => handleDelete(task)} />
            </div>
        </div>
    )
}

export default SingleTask
