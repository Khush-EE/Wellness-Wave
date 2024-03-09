import React from 'react'

function Resources() {
    return (
        <div className='w-[100vw] h-[100vh]'>
            <div className='w-[20%] h-[40vh] ml-10 mt-[15vh] flex flex-col gap-6 items-start justify-start rounded'>
                <div className='w-full h-[30vh] bg-gray-200 border-2 border-gray-400'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/011/411/660/small/man-felling-depression-under-moral-stressful-sad-feel-guilty-need-attention-help-sitting-alone-vector.jpg" className='p-3 w-full h-full object-cover rounded'/>
                </div>
                <div className='w-full p-2 flex flex-col items-start justify-start'>
                    <h1 className='text-2xl font-bold italic'>
                        Depression
                    </h1>
                    <p className='text-slate-400'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero dicta labore hic rem quisquam laborum, itaque eveniet eaque perspiciatis iure reprehenderit minima debitis ipsum doloribus nam cupiditate voluptatibus sunt, aliquam laudantium corporis suscipit necessitatibus corrupti ea numquam! Unde ex inventore fugiat praesentium cupiditate voluptate?
                    </p>
                </div>
                <div>
                    <button className='bg-yellow-600 p-2 m-2 text-lg rounded-md hover:bg-yellow-800'>Read More</button>
                    <button className='border-2 border-yellow-600 p-2 m-2 text-lg rounded-md hover:bg-yellow-800'>Take A Quiz</button>
                </div>
            </div>
        </div>
    )
}

export default Resources