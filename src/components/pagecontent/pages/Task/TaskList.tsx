import { FC } from 'react'
import { TaskModel } from '../../../../models'
import SingleTask from './SingleTask'

interface Props {
    tasks: TaskModel[]
    handleAllTask: () => Promise<void>
    search: string
}

const TaskList: FC<Props> = ({ tasks, handleAllTask, search }) => {
    return (
        <div>
            {tasks
                .filter((data) =>
                    data.task_name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((task: TaskModel) => (
                    <SingleTask
                        task={task}
                        key={task.id}
                        handleAllTask={handleAllTask}
                    />
                ))}
        </div>
    )
}

export default TaskList
