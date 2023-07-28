import { FC } from 'react'
import { Typography } from 'antd'

import Button from '../../components/Button'
import { useNavigate } from 'react-router'

const { Title } = Typography

const index: FC = () => {
    const navigate = useNavigate()

    return (
        <div className="homepage">
            <Title>Hello, Welcome</Title>

            <Title level={3}>
                This is a sample Task Management System for my Exam in 1210
                Services Inc.
            </Title>

            <Title level={4}></Title>
            <p>
                Hi I'm Sam, I'm a front end developer with more than 3 years of
                experience in web development. I've worked on a variety of
                projects for clients. I'm passionate about creating great user
                experiences and have a strong understanding of usability and
                accessibility standards. In my current work the tools that I use
                are ReactJS for main Framework, Redux for state management, Antd
                and SASS for design framework and Git for versioning tool. I
                hope you will give me a chance to prove my words in the real
                job.
            </p>
            <br />
            <p className="p-margin">
                To test my work, you can signup below and login on the app.
            </p>

            <div className="btn-wraps-home">
                <div className="btnsss">
                    <span onClick={() => navigate('/login')}>
                        <Button width="250px">Signin</Button>
                    </span>
                    <Title style={{ margin: '0' }} level={3}>
                        OR
                    </Title>
                    <span onClick={() => navigate('/signup')}>
                        <Button width="250px">Signup</Button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default index
