import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import pic from "../assets/profilePic.jpg"
import logo from "../assets/logo.png"

function Header() {

    const routes = [
        {
            path: '/',
            name: 'Home'
        },
        {
            path: '/findhelp',
            name: 'Find Help'
        },
        {
            path: '/resource',
            name: 'Resource'
        },
        {
            path: '/forum',
            name: 'Forum'
        }
    ]

    const [showOptions, setShowOptions] = useState(false)

  return (
    <nav className='px-5 md:px-10 flex items-center justify-start w-full h-[60px] shadow-2 border-gray-600 shadow-slate-300 bg-black bg-opacity-50 fixed top-0 left-0 z-20'>
        <div className='text-2xl font-bold w-[50px] h-[50px] md:mr-4 rounded-full'>
                <img src={logo} onClick={() => {
                  setShowOptions(!showOptions)
                }} className='w-full h-full cursor-pointer rounded-full'/>
        </div>
        <div className='w-[50%] text-yellow-600 font-semibold'>
          <ul className={`absolute ${showOptions ? "flex bg-black": "hidden" }  py-2 md:p-0 top-[60px] left-3 md:static md:flex flex-col md:flex-row items-center justify-start gap-6`}>
              {
                  routes.map((route, index) => <NavLink key={index} to={route.path} className={({isActive}) => ('hover:bg-yellow-600 rounded-full hover:text-black p-2 px-4 hover:shadow-xl transition-colors shadow-slate-400 ' + (isActive?"bg-yellow-600 bg-opacity-80 rounded-full text-black":""))}>
                      {route.name}
                  </NavLink>)
              }
          </ul>
        </div>
        <ul className='flex items-center w-[60%] md:w-[40%] justify-end gap-4 text-yellow-600'>
          <li><i className='fa-solid fa-sun text-xl'></i></li>
          <li><i className='fa-solid fa-bell text-xl'></i></li>
          <li>
            <img src={pic} className='w-[50px] h-[50px] object-cover rounded-full hidden'/>
            <p className='hover:bg-yellow-600 w-full rounded-full cursor-pointer font-semibold hover:text-black p-2 px-4 hover:shadow-xl transition-colors shadow-slate-400'>Sign Up</p>
          </li>
        </ul>
    </nav>

  )
}

export default Header