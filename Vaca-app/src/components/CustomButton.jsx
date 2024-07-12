import React from 'react';

export default function CustomButton({
    children,
    otherStyles,
    onClickFunction,
    type = 'button',
    disabled = false,
    variant = 'primary',
}) {
    const variants = {
        primary: `bg-brown-p rounded-md
                min-w-20 px-3 py-1
                shadow-sombra
                text-white text-center 
                border-brown-p border-2 
                hover:ring-0 

                enabled:hover:bg-yellow-800 
                enabled:focus:bg-zinc-300 enabled:focus:border-2 enabled:focus:text-brown-p
                enabled:active:outline-none enabled:active:bg-zinc-200 enabled:active:text-yellow-800 enabled:active:border-yellow-800

                disabled:opacity-50 

                md:py-2 md:text-base`,

        secondary: `bg-white rounded-md 
                min-w-20 px-3 py-1
                shadow-sombra
                text-brown-p text-center 
                border-brown-p border-2
                hover:ring-0 focus:ring-0

                enabled:hover:bg-zinc-100 
                enabled:focus:bg-zinc-300 enabled:focus:border-2 enabled:focus:text-brown-p
                enabled:active:outline-none enabled:active:bg-zinc-200 enabled:active:text-yellow-800 enabled:active:border-yellow-800
                
                disabled:opacity-50 

                md:py-2 md:text-base`,
    };
    return (
        <button
            className={
                (variant === 'primary' ? variants.primary : variants.secondary) + ' ' + otherStyles
            }
            disabled={disabled}
            onClick={onClickFunction}
            type={type}
        >
            {children}
        </button>
    );
}
