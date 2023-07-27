import { FC } from 'react'
import { Menu } from 'antd'
import { FaTasks } from 'react-icons/fa'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const index: FC = () => {
    const navigate = useNavigate()
    return (
        <div className="menu-right">
            <Menu
                onClick={(item) => {
                    navigate(item.key)
                }}
                selectedKeys={[window.location.pathname]}
                items={[
                    {
                        key: '/tasks',
                        label: 'Tasks',
                        icon: <FaTasks />,
                    },
                    {
                        key: '/add-task',
                        label: 'Add Task',
                        icon: <AiOutlineFileAdd />,
                    },
                    {
                        key: '/deleted-tasks',
                        label: 'Trash',
                        icon: <BsTrash />,
                    },
                ]}
            ></Menu>
        </div>
    )
}

export default index
