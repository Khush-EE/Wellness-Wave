import React from 'react'

function Button({
    children,
    className = '',
    ...props
}) {
    return (
        <button
        className={`bg-yellow-600 w-[15%] h-[10vh] rounded-lg text-xl hover:opacity-100 font-semibold ${className}`}
        {...props}>
            {children}
        </button>
    )
}

export default Button