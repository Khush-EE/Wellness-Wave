import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlogById } from '../ApiRequests/blog'

const Blog = () => {

  const {id} = useParams()
  const [blog, setBlog] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async() => {
      try{
        setLoading(true)
        const response = await getBlogById(id)
        setBlog(response)
      } catch(err){
        console.error("Error while fetching blog:- ", err)
      } finally{
        setLoading(false)
      }
    })()
  }, [id])

  return (
    !loading && <div className='mt-[60px] px-9 py-3 bg-slate-200 h-[70vh]'>
      {id}
    </div>
  )
}

export default Blog
