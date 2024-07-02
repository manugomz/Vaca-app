import React from 'react';
import { IoClose } from 'react-icons/io5';

export default function Modal({ onClose, children, method }) {
    const style = {
        modal: `absolute
                flex flex-col gap-2 top-1/3 left-1/4
                mx-4 py-4 px-8 
                w-80 z-10
                bg-white rounded-md`,
        modalBackground: `fixed left-0 top-0
                    flex justify-center 
                    w-screen h-screen 
                    transition-colors bg-[rgb(0,0,0,0.5)]
                    font-fredoka`,
    };

    return (
        <>
            <div className={style.modalBackground}></div>
            <form className={style.modal} method={method}>
                <button className="self-end" type="reset" onClick={() => onClose()}>
                    <IoClose />
                </button>
                {children}
            </form>
        </>
    );
}
