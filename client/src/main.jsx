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
import Blog from './pages/Blog.jsx'

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
                path: "/findhelp",
                element: <FindHelp />
            },
            {
                path: "/forum",
                element: <Forum />
            },
            {
                path: "/profile/:id",
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
                path: '/resources',
                element: <Resources />
            },
            {
              path: '/blog/:id',
              element: <Blog />
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
