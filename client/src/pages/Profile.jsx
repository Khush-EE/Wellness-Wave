import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { userById } from '../ApiRequests/user.js'

function Profile() {

  const { id } = useParams()

  const [user, setUser] = useState({})

  useEffect(() => {
    ; (async () => {
      try {
        const user = await userById(id)
        setUser(user)
      } catch (error) {
        console.log("Error while fetching user:- ", error)
      }
    })()
  }, [id])

  return (
    <div className='flex justify-center items-center mt-[60px] px-5 py-2'>
      <div className='bg-slate-200 w-[75%] h-[80vh] rounded-md'>
        {/* profile section */}
        <div className='flex flex-col md:flex-row text-xl justify-around'>
          <div>
            <img className='w-[200px] h-[200px]' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs2M0tgGjGOEC_oc7XMF7OY3wbwONkacemyD42gMZkpg&s" || user?.avatarImage} alt="" />
            <p>{user?.fullName}</p>
            <p>{user?.email}</p>
          </div>
          <div>
            bwoief
          </div>
        </div>

        {/* blogs section */}
        <div></div>
      </div>
    </div>
  )
}

export default Profile