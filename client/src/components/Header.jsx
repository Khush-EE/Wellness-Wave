import React from 'react'
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
            path: '/services',
            name: 'Services'
        },
        {
            path: '/resources',
            name: 'Resources'
        }
    ]

  return (
    <nav className='px-10 flex items-center justify-start w-full h-[15vh] shadow-lg shadow-slate-300'>
        <div className='text-2xl font-bold w-[10%] h-full'>
            <NavLink to='/'>
                <img src={logo} className='w-auto h-full'/>
            </NavLink>
        </div>
        <ul className='flex items-center w-[50%] font-semibold justify-start gap-6'>
            {
                routes.map((route, index) => <NavLink key={index} to={route.path} className={({isActive}) => ('hover:bg-yellow-200 hover:rounded-full p-2 px-4 hover:shadow-xl shadow-slate-400 ' + (isActive?"bg-yellow-200 rounded-full shadow-lg":""))}>
                    {route.name}
                </NavLink>)
            }
        </ul>
        <ul className='flex items-center w-[40%] justify-end gap-10'>
          <li><i className='fa-solid fa-sun text-xl'></i></li>
          <li><i className='fa-solid fa-bell text-xl'></i></li>
          <li><img src={pic} className='w-[50px] h-[50px] object-cover rounded-full'/></li>
        </ul>
    </nav>

  )
}

export default Header