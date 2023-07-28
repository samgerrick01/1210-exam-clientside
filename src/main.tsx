import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'react-auth-kit'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider
                authType={'cookie'}
                authName={'_auth'}
                cookieDomain={window.location.hostname}
                cookieSecure={false}
            >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </React.StrictMode>,
)
