import { FC, useState } from 'react'
import { Form, Input, message } from 'antd'
import CustomButton from '../../../Button'
import { FormModel } from '../../../../models'
import { addTask } from '../../../../services'
import { useAuthUser } from 'react-auth-kit'

const index: FC = () => {
    const [form] = Form.useForm()
    const authUser = useAuthUser()
    const [messageApi, contextHolder] = message.useMessage()
    const initialValues = {
        taskName: '',
        status: 'To Do',
        createdAt: new Date(),
        createdBy: authUser()?.user?.email,
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
            <label className="title-task">Add Task</label>

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
                            style={{
                                width: '100%',
                                textTransform: 'capitalize',
                            }}
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
