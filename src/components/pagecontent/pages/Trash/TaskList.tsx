import { FC } from 'react'
import { TaskModel } from '../../../../models'
import SingleTask from './SingleTask'

interface Props {
    trash: TaskModel[]
    search: string
}

const TaskList: FC<Props> = ({ trash, search }) => {
    return (
        <div>
            {trash
                .filter((data) =>
                    data.task_name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((item: TaskModel) => (
                    <SingleTask item={item} key={item.id} />
                ))}
        </div>
    )
}

export default TaskList
