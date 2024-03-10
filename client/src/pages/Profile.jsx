import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { userById } from '../ApiRequests/user.js'

function Profile() {

  const { id } = useParams()

  const [user, setUser] = useState({})

  useEffect(() => {
    ;(async() => {
      try {
        const user = await userById(id)
        setUser(user)
      } catch (error) {
        console.error("Error while fetching user:- ", error)
      }
    })()
  },[id])

  return (
    <div className='flex justify-center items-center mt-[60px] px-5 py-2'>
      <div className='bg-slate-200 w-[75%] h-[80vh] rounded-md'>
        {/* profile section */} 
        <div className='flex flex-col md:flex-row text-xl gap-5 items-center justify-around py-6'>
          <div className='text-center mx-auto md:w-[50%]'>
            <img className='w-[200px] mx-auto h-[200px] rounded-full object-cover object-center' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs2M0tgGjGOEC_oc7XMF7OY3wbwONkacemyD42gMZkpg&s" || user?.avatarImage} alt="" />
            <p>{user?.fullName}</p>
            <p>{user?.email}</p>
            {
              user?.phoneNumber && <p>{user?.phoneNumber}</p>
            }
          </div>
          <div className='md:w-[50%] text-center mx-auto'>
            <p>Mental Disorders</p>
            <hr className='w-[70%] mx-auto mb-2' />
            {
              user?.mentalDisorder?.length > 0 ? <><p>{user?.mentalDisorder}</p> <button className='bg-yellow-500 p-2 px-3 rounded-md'>Take further quiz</button></>
              : <button className='bg-yellow-500 p-2 px-3 rounded-md'>Take a quiz</button>
            } 
          </div>
        </div>

        {/* blogs section */}
        <div></div>
      </div>
    </div>
  )
}

export default Profile