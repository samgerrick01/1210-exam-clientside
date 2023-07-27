import { FC, useState } from 'react'
import { Space } from 'antd'
import SideMenu from '../../../components/sidemenu'
import PageContent from '../../../components/pagecontent'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { FaTasks } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const index: FC = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState<boolean>(false)
    return (
        <Space className="side-menu">
            <div onClick={() => setToggle(!toggle)} className="minimize">
                {toggle ? <IoClose /> : <GiHamburgerMenu />}
            </div>
            <div
                style={toggle ? { display: 'block' } : { display: 'none' }}
                onClick={() => setToggle(!toggle)}
                className="menu-right-responsive"
            >
                <div className="container">
                    <div onClick={() => navigate('/tasks')} className="item">
                        <FaTasks />
                        &nbsp;&nbsp;&nbsp;Tasks
                    </div>
                    <div onClick={() => navigate('/add-task')} className="item">
                        <AiOutlineFileAdd />
                        &nbsp;&nbsp;&nbsp;Add Task
                    </div>
                    <div
                        onClick={() => navigate('/deleted-tasks')}
                        className="item"
                    >
                        <BsTrash />
                        &nbsp;&nbsp;&nbsp;Trash
                    </div>
                </div>
            </div>
            <SideMenu />
            <div style={{ display: 'flex' }}>
                <PageContent />
            </div>
        </Space>
    )
}

export default index
