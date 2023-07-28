import { FC, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'

import NavBar from './components/navbar'
import Footer from './components/footer'
import HomePage from './pages/home'
import LoginPage from './pages/auth/login'
import SignupPage from './pages/auth/signup'
import UserPage from './pages/user/homepage'
import Loading from './components/loading'

import { RequireAuth } from 'react-auth-kit'

const App: FC = () => {
    const [state, setState] = useState<boolean>(false)
    const [theme, setTheme] = useState<string>('light')

    useEffect(() => {
        setTheme(localStorage.getItem('theme') || 'light')
    }, [state])
    return (
        <div className="App">
            <NavBar theme={theme} setState={setState} state={state} />
            {/* <HomePage /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/userpage/*"
                    element={
                        <RequireAuth loginPath="/login">
                            <UserPage />
                        </RequireAuth>
                    }
                />
            </Routes>
            <Loading />
            <Footer />
        </div>
    )
}

export default App
