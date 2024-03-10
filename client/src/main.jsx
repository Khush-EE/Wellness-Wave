import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home.jsx'
import FindHelp from './pages/FindHelp.jsx'
import Profile from './pages/Profile.jsx'
import ChatBot from './pages/ChatBot.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Moredetails from './pages/Moredetails.jsx'
import Resources from "./pages/Resources.jsx"
import Forum from './pages/Forum.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import WriteForum from './pages/WriteForum.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <AuthLayout>
                    <Home />
                </AuthLayout>
            },
            {
                path: "/findhelp",
                element: <AuthLayout>
                    <FindHelp />
                </AuthLayout>
            },
            {
                path: "/forum",
                element: <AuthLayout>
                    <Forum />
                </AuthLayout>
            },
            {
                path: "/profile/:id",
                element: <AuthLayout>
                    <Profile />
                </AuthLayout>
            },
            {
                path: "/bot",
                element: <AuthLayout>
                    <ChatBot />
                </AuthLayout>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/moredetails',
                element: <Moredetails />

            },
            {
                path: '/resources',
                element: <AuthLayout>
                    <Resources />
                </AuthLayout>
            },
            {
                path: '/write',
                element: <AuthLayout>
                    <WriteForum />
                </AuthLayout>
            },
            {
                path: "*",
                element: <h1>Wrong Path</h1>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
