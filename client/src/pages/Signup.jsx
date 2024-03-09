import React, { useState } from 'react'
import { Button, Input } from '../components/index.js'
import { useForm } from 'react-hook-form'
import Logo from '../assets/logo.png'

function Signup() {
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit } = useForm();

    const submit = async (data) => {
        console.log(data)
    }
    return (
        <div className=' mt-[15vh] w-[100vw] h-[85vh] flex flex-col items-center justify-center'>
            <div className='w-[30%] border-2 bg-yellow-100 bg-opacity-45 border-gray-300 flex flex-col items-center justify-center p-2 rounded-lg gap-0' style={{ boxShadow: '3px 3px 6px rgba(0,0,0,0.2)' }}>
                <img className='w-[50%]' src={Logo} />
                <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit(submit)}>
                    <Input type="email" register={register} name='email' className='w-[25vw]' placeholder='Email' />
                    <Input type={showPass?"text":"password"} register={register} name='password' className='w-[25vw]' placeholder='Password' />
                    <div className=' self-start ml-2 cursor-pointer'>
                        <input type='checkbox' id='showPass' className='mr-2' onClick={() => {setShowPass((prev) => !prev)}} />
                        <label htmlFor="showPass">Show Password</label>
                    </div>
                    <Input type="password" register={register} name='password' className='w-[25vw]' placeholder='Confirm Password' />
                    <Button type='submit' className='w-[5vw] h-[10vh] font-normal rounded-md p-3 bg-yellow-300 mb-5'>signup</Button>
                    {/* <Button type */}
                </form>
            </div>
        </div>
    )
}


export default Signup