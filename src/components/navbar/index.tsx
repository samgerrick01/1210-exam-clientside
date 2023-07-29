import React, { FC } from 'react'
import ThemeSwitch from '../theme'
import LogoDark from '../../assets/sam-logo.svg'
import LogoLight from '../../assets/sam-logo1.svg'
import { useAuthUser, useIsAuthenticated, useSignOut } from 'react-auth-kit'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { clearAllState } from '../../redux/taskSlice'
import { useAppDispatch } from '../../redux/app'

interface Props {
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
    theme: string
}

const index: FC<Props> = ({ state, setState, theme }) => {
    const authUser = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
    const signOut = useSignOut()
    const dispatch = useAppDispatch()

    return (
        <div className="navbar">
            <div className="container">
                <div>
                    <img
                        src={theme === 'light' ? LogoLight : LogoDark}
                        alt="logo"
                    />
                </div>
                {isAuthenticated() ? (
                    <div className="title">{`Welcome ${
                        authUser()?.user?.nickname
                    }`}</div>
                ) : (
                    <div className="title">{'Task Management System'}</div>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                    <ThemeSwitch state={state} setState={setState} />
                    {isAuthenticated() && (
                        <Button
                            onClick={() => {
                                signOut()
                                dispatch(clearAllState())
                                navigate('/')
                            }}
                            type="primary"
                        >
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default index
