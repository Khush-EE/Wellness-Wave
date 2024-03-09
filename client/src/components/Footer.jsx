import React from 'react'

function Footer() {
  return (
    <footer className='w-full h-[30vh] text-center bg-black text-white'>
      
        <div className='flex w-full h-[40%] items-center justify-between'>
          <h1 className='text-5xl font-bold m-3 text-gray-400'>
            <span className='text-yellow-600'>सुकून</span> Space
          </h1>
          <div className='grid m-3 grid-cols-2 grid-rows-2 text-xl gap-2 font-semibold text-gray-400'>
            <a href="https://github.com/mdrehan369" target='__blank'>MD Rehan</a>
            <a href="">Khushi</a>
            <a>Vishal Kumar</a>
            <a>MD Asiful Ameen</a>
          </div>
        </div>
        <div>

        </div>
        <div>
          
        </div>
    </footer>
  )
}

export default Footer