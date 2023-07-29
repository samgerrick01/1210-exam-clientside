import { FC, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import { signInUser } from '../../../services'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { loadingOff, loadingOn } from '../../../redux/loadingSlice'

const index: FC = () => {
    const signIn = useSignIn()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useIsAuthenticated()

    const [messageApi, contextHolder] = message.useMessage()

    const handleSubmit = async (values: any) => {
        dispatch(loadingOn())
        const res = await signInUser(values)
        if (res?.message === 'Email or Password is not Match!') {
            dispatch(loadingOff())
            messageApi.warning(res.message)
        } else if (res?.message === 'Login Success!') {
            dispatch(loadingOff())
            messageApi.success(res.message)
            signIn({
                token: res.token,
                expiresIn: 10000,
                tokenType: 'Bearer',
                authState: { user: res.user, token: res.token },
            })
        } else if (res?.message === 'Wrong Password!') {
            dispatch(loadingOff())
            messageApi.warning(res.message)
        } else {
            dispatch(loadingOff())
            messageApi.error('Internal Error!')
        }
    }

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/userpage')
        }
    }, [isAuthenticated()])

    return (
        <div className="loginpage">
            <div className="container">
                <label className="title-task">Login Page</label>
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
