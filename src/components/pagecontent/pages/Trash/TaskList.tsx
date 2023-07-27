import { FC } from 'react'
import { TaskModel } from '../../../../models'
import SingleTask from './SingleTask'

interface Props {
    trash: TaskModel[]
    handleAllTrash: () => Promise<void>
    search: string
}

const TaskList: FC<Props> = ({ trash, handleAllTrash, search }) => {
    return (
        <div>
            {trash
                .filter((data) =>
                    data.task_name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((item: TaskModel) => (
                    <SingleTask
                        item={item}
                        key={item.id}
                        handleAllTrash={handleAllTrash}
                    />
                ))}
        </div>
    )
}

export default TaskList
