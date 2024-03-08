import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import FindHelp from './pages/FindHelp.jsx'
import Resources from './pages/Resources.jsx'
import Profile from './pages/Profile.jsx'
import ChatBot from './pages/ChatBot.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Moredetails from './pages/Moredetails.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/services",
                element: <Services />
            },
            {
                path: "/findhelp",
                element: <FindHelp />
            },
            {
                path: "/resources",
                element: <Resources />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/bot",
                element: <ChatBot />
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
                element : <Moredetails />

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
