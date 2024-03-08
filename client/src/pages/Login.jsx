import React, { useState } from 'react'
import { Button, Input } from '../components/index.js'
import { useForm } from 'react-hook-form'
import Logo from '../assets/logo.png'

function Login() {
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit } = useForm();
    return (
        <div className='mt-[15vh] w-[100vw] h-[85vh] flex flex-col items-center justify-center'>
            <div className='border-2 border-gray-300 flex flex-col items-center justify-center p-2 rounded-lg shadow-2 gap-4' style={{boxShadow: '3px 3px 6px rgba(0,0,0,0.2)'}}>
                <img className='w-[50%]' src={Logo} />
                <form className='flex flex-col items-center justify-center'>
                    <Input type="email" register={register} name='email' className='w-[25vw]' placeholder='Email' />
                    <Input type={showPass?"text":"password"} register={register} name='password' className='w-[25vw]' placeholder='Password' />
                    <div className=' self-start ml-3'>
                        <input type='checkbox' id='showPass' onClick={() => setShowPass((prev) => !prev)} />
                        <label htmlFor="showPass">Show Password</label>
                    </div>
                    <Button type='submit' className='w-[5vw] h-[10vh] font-normal rounded-md p-3 bg-yellow-300 mb-5'>login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login