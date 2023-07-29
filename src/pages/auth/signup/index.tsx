import { FC } from 'react'
import { Form, Input, Button, message } from 'antd'
import { signUpUser } from '../../../services'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { loadingOff, loadingOn } from '../../../redux/loadingSlice'

const index: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const [messageApi, contextHolder] = message.useMessage()

    const handleSubmit = async (values: any) => {
        dispatch(loadingOn())
        const res = await signUpUser(values)
        if (res?.message === 'Email is already taken!') {
            dispatch(loadingOff())
            messageApi.warning(res.message)
        } else if (res?.message === 'Signup Success!') {
            dispatch(loadingOff())
            messageApi.success(res.message)
            form.resetFields()
        } else {
            dispatch(loadingOff())
            messageApi.error('Internal Error!')
        }
    }

    return (
        <div className="loginpage">
            <div className="container">
                <label className="title-task">Signup Page</label>
                <Form onFinish={handleSubmit} autoComplete="off" form={form}>
                    <label>Nickname:</label>
                    <Form.Item
                        name="nickname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                            },
                        ]}
                    >
                        <Input size="large" type="text" placeholder="Email" />
                    </Form.Item>
                    <label>Email:</label>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input size="large" type="email" placeholder="Email" />
                    </Form.Item>
                    <label>Password:</label>
                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password size="large" placeholder="Password" />
                    </Form.Item>
                    <label>Confirim Password:</label>
                    <Form.Item
                        name="confirm_password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The new password that you entered do not match!',
                                        ),
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" placeholder="Password" />
                    </Form.Item>
                    <div className="btn-wrap">
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                size="large"
                                type="primary"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
                <span
                    className="cursor-pointer"
                    onClick={() => navigate('/login')}
                >
                    Have an account? Signin here!
                </span>
            </div>
            {contextHolder}
        </div>
    )
}

export default index
