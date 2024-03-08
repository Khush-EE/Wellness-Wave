import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import FindHelp from './pages/FindHelp.jsx'
import Profile from './pages/Profile.jsx'

import Forum from './pages/Forum.jsx'

 


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
                path: "/forum",
                element: <Forum />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "*",
                element: <h1>Wrong Path</h1>
            },
            {
                path: "/News",
                element: <News/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
