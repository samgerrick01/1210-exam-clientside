import { FC } from 'react'
import { TaskModel } from '../../../../models'
import moment from 'moment'

interface Props {
    item: TaskModel
    handleAllTrash: () => Promise<void>
}

const SingleTask: FC<Props> = ({ item, handleAllTrash }) => {
    const date = moment(item.created_date).format('MMM DD, YYYY, h:mm A')

    return (
        <div className="table-body-trash">
            <div className="table-body-item">{item.task_name}</div>
            <div className="table-body-item">{item.status}</div>
            <div className="table-body-item">{date}</div>
        </div>
    )
}

export default SingleTask
