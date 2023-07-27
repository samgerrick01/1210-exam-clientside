import { FC, useEffect, useState } from 'react'
import { Typography, Input, message } from 'antd'
import { getTrash, deleteTrash } from '../../../../services'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAllTrash,
    sortByDateTrash,
    sortByDateTrashRev,
} from '../../../../redux/taskSlice'
import TaskList from './TaskList'
import { FaSortDown, FaSortUp, FaRecycle } from 'react-icons/fa'

const { Title } = Typography

const index: FC = () => {
    const dispatch = useDispatch()

    const [isDateReverse, setIsDateReverse] = useState<boolean>(false)

    const { trash } = useSelector((state: any) => state.tasks)

    const [search, setSearch] = useState<string>('')

    const [messageApi, contextHolder] = message.useMessage()

    const handleAllTrash = async () => {
        const res = await getTrash({ email: 'Sam' })
        dispatch(getAllTrash(res))
    }

    const handleDelete = async () => {
        const res = await deleteTrash({ email: 'Sam' })
        if (res === 'Delete Successfully!') {
            messageApi.success('All Trash Deleted!', 3)
            handleAllTrash()
        }
    }

    const handleSort = () => {
        if (!isDateReverse) {
            dispatch(sortByDateTrash())
            setIsDateReverse(!isDateReverse)
        } else {
            dispatch(sortByDateTrashRev())
            setIsDateReverse(!isDateReverse)
        }
    }

    useEffect(() => {
        handleAllTrash()
    }, [])

    return (
        <div className="tasks">
            <Title className="btn-del-all-wrap">
                Trash
                <button onClick={handleDelete} className="btn-empty">
                    Empty Now&nbsp;&nbsp;
                    <FaRecycle size={25} />
                </button>
            </Title>
            <Input
                placeholder="Search Task"
                size="large"
                style={{ textTransform: 'capitalize' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="table">
                <div className="table-header-trash">
                    <div className="table-header-item">Task</div>
                    <div className="table-header-item">Status</div>
                    <div
                        onClick={handleSort}
                        className="table-header-item cursor-pointer"
                    >
                        Created At
                        {isDateReverse ? <FaSortUp /> : <FaSortDown />}
                    </div>
                </div>

                {trash.length === 0 && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px',
                        }}
                    >{`No Trash`}</div>
                )}
                {trash.length > 0 && <TaskList trash={trash} search={search} />}
            </div>
            {contextHolder}
        </div>
    )
}

export default index
