import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <nav className='bg-sky-300 flex items-center justify-around w-full h-[10vh]'>
        <div>
            Logo
        </div>
        <ul className='flex items-center w-[50%] justify-around'>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/findhelp'>Find Help</NavLink></li>
            <li><NavLink to='/services'>Services</NavLink></li>
            <li><NavLink to='/resources'>Resources</NavLink></li>
            <li><NavLink to='/profile'>Profile</NavLink></li>
        </ul>
    </nav>
  )
}

export default Header