import { FC } from 'react'
import { Modal, Spin } from 'antd'
import { useSelector } from 'react-redux'

const index: FC = () => {
    const { load } = useSelector((state: any) => state.loading)
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
