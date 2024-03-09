import React from 'react'
import { Input } from '../components/index.js'
import { useForm } from 'react-hook-form'

function Moredetails() {
    const { register, handleSubmit } = useForm()
    return (
        <div className=' mt-[15vh] w-[100vw] h-[85vh] flex flex-col items-center justify-center'>
            <form className='w-full flex flex-col items-center justify-center'>
                <Input type="text" register={register} name='firstName' className='w-[25vw]' placeholder='First Name' />
                <Input type="text" register={register} name='lastName' className='w-[25vw]' placeholder='Last Name' />
                <Input type="number" register={register} name='phoneNumber' className='w-[25vw]' placeholder='Phone Number' />
                <Input type="number" register={register} name='age' className='w-[25vw]' placeholder='Age' />
                <Input type="text" register={register} name='location' className='w-[25vw]' placeholder='Location' />
            </form>
        </div>
    )
}

export default Moredetails