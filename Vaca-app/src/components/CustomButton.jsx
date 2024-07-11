import React from 'react';

export default function customButton({
    otherStlyes,
    onClickFunction,
    text,
    type = 'button',
    disabled = false,
}) {
    return (
        <button
            className={
                `bg-brown-p rounded-md
                        min-w-20 px-3 py-1
                        shadow-sombra 
                        text-white text-xs 
                        md:text-base
                        hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
                        focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p
                        active:outline-none active:bg-zinc-300 active:ring-brown-p
                        disabled:opacity-50
                        md:py-2` + otherStlyes
            }
            disabled={disabled}
            onClick={onClickFunction}
            type={type}
        >
            {text}
        </button>
    );
}
