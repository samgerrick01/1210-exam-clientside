import { FC, useState, useRef, useEffect } from 'react'
import { TaskModel } from '../../../../models'
import moment from 'moment'
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import { changeStatus, moveToTrash, updateTask } from '../../../../services'
import { message, Input } from 'antd'
import { set } from 'lodash'

interface Props {
    task: TaskModel
    handleAllTask: () => Promise<void>
}

const SingleTask: FC<Props> = ({ task, handleAllTask }) => {
    const date = moment(task.created_date).format('MMM DD, YYYY, h:mm A')
    const [messageApi, contextHolder] = message.useMessage()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [data, setData] = useState<TaskModel>(task)
    const inputRef = useRef<any>(null)

    const handleDelete = async (task: TaskModel) => {
        const res = await moveToTrash(task)
        if (res === 'Move to Trash!') {
            messageApi.success('Moved to Trash!', 3)
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
        const res = await updateTask(data.id, data.task_name)
        if (res === 'Update Successfully!') {
            setIsEdit(false)
            messageApi.success('Update Successfully!', 3)
            handleAllTask()
        }
    }

    const handleComplete = async (task: TaskModel) => {
        let newStatus = ''
        if (task?.status.toLocaleLowerCase() === 'to do') {
            newStatus = 'In Progress'
            await changeStatus(task.id, newStatus)
            messageApi.success('Changed!', 3)
            handleAllTask()
        } else if (task?.status.toLocaleLowerCase() === 'in progress') {
            newStatus = 'Completed'
            await changeStatus(task.id, newStatus)
            messageApi.success('Changed!', 3)
            handleAllTask()
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
