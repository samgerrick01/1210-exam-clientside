import React, { FC } from 'react'
import ThemeSwitch from '../theme'
import LogoDark from '../../assets/sam-logo.svg'
import LogoLight from '../../assets/sam-logo1.svg'

interface Props {
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
    theme: string
}

const index: FC<Props> = ({ state, setState, theme }) => {
    return (
        <div className="navbar">
            <div className="container">
                <div>
                    <img
                        src={theme === 'light' ? LogoLight : LogoDark}
                        alt="logo"
                    />
                </div>
                <div className="title">{'Task Management System'}</div>
                <div>
                    <ThemeSwitch state={state} setState={setState} />
                </div>
            </div>
        </div>
    )
}

export default index
