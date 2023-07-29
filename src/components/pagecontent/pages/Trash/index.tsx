import { FC, useEffect, useState } from 'react'
import { Input, message } from 'antd'
import { getTrash, deleteTrash } from '../../../../services'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAllTrash,
    sortByDateTrash,
    sortByDateTrashRev,
} from '../../../../redux/taskSlice'
import TaskList from './TaskList'
import { FaSortDown, FaSortUp, FaRecycle } from 'react-icons/fa'
import { useAuthUser } from 'react-auth-kit'
import { loadingOff, loadingOn } from '../../../../redux/loadingSlice'

const index: FC = () => {
    const dispatch = useDispatch()
    const authUser = useAuthUser()

    const [isDateReverse, setIsDateReverse] = useState<boolean>(false)

    const { trash } = useSelector((state: any) => state.tasks)

    const [search, setSearch] = useState<string>('')

    const [messageApi, contextHolder] = message.useMessage()

    const handleAllTrash = async () => {
        dispatch(loadingOn())
        const res = await getTrash(
            { email: authUser()?.user?.email },
            authUser()?.token,
        )
        dispatch(getAllTrash(res))
        dispatch(loadingOff())
    }

    const handleDelete = async () => {
        dispatch(loadingOn())
        const res = await deleteTrash(
            { email: authUser()?.user?.email },
            authUser()?.token,
        )
        if (res === 'Delete Successfully!') {
            messageApi.success('All Trash Deleted!', 3)
            handleAllTrash()
            dispatch(loadingOff())
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
            <label className="btn-del-all-wrap title-task">
                Trash
                <button onClick={handleDelete} className="btn-empty">
                    Empty Now&nbsp;&nbsp;
                    <FaRecycle size={25} />
                </button>
            </label>
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
