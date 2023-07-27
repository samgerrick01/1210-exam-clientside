import { FC, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'

import NavBar from './components/navbar'
import Footer from './components/footer'
import HomePage from './pages/user/homepage'

const App: FC = () => {
    const [state, setState] = useState<boolean>(false)
    const [theme, setTheme] = useState<string>('light')

    useEffect(() => {
        setTheme(localStorage.getItem('theme') || 'light')
    }, [state])
    return (
        <div className="App">
            <NavBar theme={theme} setState={setState} state={state} />
            <HomePage />
            {/* <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes> */}
            <Footer />
        </div>
    )
}

export default App
