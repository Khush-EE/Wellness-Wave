import React from 'react'
import { twMerge } from 'tailwind-merge'

function Input({
    name,
    className='',
    type='text',
    label='',
    register,
    ...props
}) {
  return (
    <div className='w-auto h-full'>
        <label htmlFor={name}>{label}</label>
        <input type={type} className={twMerge(`border-2 border-slate-400 bg-slate-100 w-[50vw] h-[6vh] rounded-md p-3 m-2 text-black + ${className}`)} {...register(name)} {...props}/>
    </div>
  )
}

export default Input