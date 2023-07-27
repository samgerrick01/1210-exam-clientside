import { FC, useState } from 'react'
import { Typography, Form, Input, message } from 'antd'
import CustomButton from '../../../Button'
import { FormModel } from '../../../../models'
import { addTask } from '../../../../services'

const { Title } = Typography

const index: FC = () => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const initialValues = {
        taskName: '',
        status: 'To Do',
        createdAt: new Date(),
        createdBy: 'Sam',
    }

    const [formData, setFormData] = useState<FormModel>(initialValues)

    const onFinish = async () => {
        const res = await addTask(formData)
        if (res === 'Added Successfully!') {
            messageApi.success('Task Added Successfully!', 3)
            form.resetFields()
            setFormData(initialValues)
        }
    }
    return (
        <div className="add-task">
            <Title>Add Task</Title>

            <div className="form-container">
                <Form
                    form={form}
                    autoComplete="off"
                    onFinish={onFinish}
                    style={{ width: '100%' }}
                >
                    <label>Task Name:</label>
                    <Form.Item
                        name="taskname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Task!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input
                            style={{ width: '100%' }}
                            placeholder="Task Name"
                            size="large"
                            value={formData.taskName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    taskName: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CustomButton width="250px">Add Task</CustomButton>
                    </div>
                </Form>
            </div>
            {contextHolder}
        </div>
    )
}

export default index
