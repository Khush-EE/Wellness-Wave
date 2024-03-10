import React from 'react'
import { twMerge } from 'tailwind-merge'

function Button({
    children,
    className = '',
    ...props
}) {
    return (
        <button
        className={twMerge(`bg-yellow-600 bg-opacity-50 w-[10vw] h-[8vh] rounded-lg text-xl hover:opacity-100 font-semibold ${className}`)}
        {...props}>
            {children}
        </button>
    )
}

export default Button