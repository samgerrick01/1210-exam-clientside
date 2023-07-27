import React, { FC } from 'react'
import './style.css'

interface Props {
    children: React.ReactNode
    width?: string
    fontSize?: string
}

const index: FC<Props> = ({ children, width, fontSize }) => {
    return (
        <button
            style={{ width: `${width}`, fontSize: `${fontSize}` }}
            className="style-button1"
        >
            {children}
        </button>
    )
}

export default index
