import React, { useEffect, useState } from 'react'
import pic1 from "../assets/pic1.jpg"
import pic2 from "../assets/pic2.jpg"
import pic3 from "../assets/pic3.jpg"
import pic4 from "../assets/pic4.jpg"
import { Button } from "./index"

function Carousel() {

    useEffect(() => {
        const slider = document.getElementById('slider');
        let counter = 0;
        setInterval(() => {
            if (slider) {
                if (counter === 3) {
                    counter = 0;
                } else {
                    counter++;
                }
                slider.style.transform = `translateX(-${counter * 100}%)`
            }
        }, 5000);

        return () => clearInterval();
    }, [])
    const explore = () => {
        window.scrollTo({top: 631, behavior: 'smooth'});
    }

    return (
        <>

            <div className='w-[100vw] h-[100vh] relative overflow-hidden'>
                <div className='w-full h-full absolute z-10 left-0 bottom-0 flex flex-col items-start justify-end gap-0 bg-black bg-opacity-50'>
                    <h1 className='text-6xl text-yellow-50 opacity-85 p-2 backdrop-blur-sm font-extrabold rounded-sm mx-16'>Welcome To <span className='text-yellow-600'>Sukoon Space!</span></h1>
                    <p className='text-2xl text-yellow-50 opacity-70 w-[70%] backdrop-blur-sm p-2 rounded-lg mb-[0%] font-bold mx-16 text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quis odio ab officiis minus rem accusamus cupiditate cumque praesentium quisquam! Doloribus quasi earum minus nesciunt, praesentium vero iusto nihil. Aperiam, eos eveniet! Ipsam delectus perferendis obcaecati nostrum dicta quo autem distinctio labore cum. Aperiam optio commodi nihil beatae quae inventore iure nemo sunt vel expedita.</p>

                    <div className='w-full ml-20 mt-8 mb-32'>
                        <Button className='mx-4 opacity-70'>Get Help</Button>
                        <Button className='mx-4 opacity-70 text-center' onClick={explore}>Explore More</Button>
                    </div>
                </div>
                <div className='w-full h-full absolute top-0 left-0 transition duration-300 scroll-smooth ' id='slider'>
                    <img src={pic2} className='absolute left-0 top-0 w-full h-full object-cover' />
                    <img src={pic1} className='absolute left-[100%] top-0 w-full h-full object-cover' />
                    <img src={pic3} className='absolute left-[200%] top-0 w-full h-full object-cover' />
                    <img src={pic4} className='absolute left-[300%] top-0 w-full h-full object-cover' />
                </div>
            </div>

        </>
    );
}

export default Carousel;
