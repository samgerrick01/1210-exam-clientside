import { FC } from 'react'
import { Modal, Spin } from 'antd'
import { useAppSelector } from '../../redux/app'

const index: FC = () => {
    const { load } = useAppSelector((state) => state.loading)
    return (
        <div>
            <Modal
                open={load}
                footer={false}
                closable={false}
                centered
                width={80}
            >
                <Spin size="large" />
            </Modal>
        </div>
    )
}

export default index
