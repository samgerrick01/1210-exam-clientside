import { FC } from 'react'
import { Form, Input, Typography, Button, message } from 'antd'
import { useSignIn } from 'react-auth-kit'
import { signInUser } from '../../../services'
import { useNavigate } from 'react-router'

const { Title } = Typography

const index: FC = () => {
    const signIn = useSignIn()
    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage()

    const handleSubmit = async (values: any) => {
        const res = await signInUser(values)
        if (res?.message === 'Email or Password is not Match!') {
            messageApi.warning(res.message)
        } else if (res?.message === 'Login Success!') {
            messageApi.success(res.message)
            signIn({
                token: res.token,
                expiresIn: 10000,
                tokenType: 'Bearer',
                authState: { user: res.user },
            })
            navigate('/userpage')
        } else if (res?.message === 'Wrong Password!') {
            messageApi.warning(res.message)
        } else {
            messageApi.error('Internal Error!')
        }
    }

    return (
        <div className="loginpage">
            <div className="container">
                <Title>Login Page</Title>
                <Form onFinish={handleSubmit} autoComplete="off">
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
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
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
                    onClick={() => navigate('/signup')}
                >
                    Don't have account? Signup here!
                </span>
            </div>
            {contextHolder}
        </div>
    )
}

export default index
