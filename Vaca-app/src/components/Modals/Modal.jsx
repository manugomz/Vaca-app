import React from 'react';
import { IoClose } from 'react-icons/io5';

export default function Modal({ onClose, children, method }) {
    const style = {
        modal: `relative
                flex flex-col self-center
                py-4 px-8 gap-2
                text-center
                w-80 z-10
                bg-white rounded-md`,
        modalBackground: `fixed left-0 top-0
                    w-full h-full 
                    transition-colors bg-[rgb(0,0,0,0.5)]
                    font-fredoka`,
    };

    return (
        <>
            <div className={style.modalBackground}></div>
            <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center">
                <form className={style.modal} method={method}>
                    <button className="self-end" type="reset" onClick={() => onClose()}>
                        <IoClose />
                    </button>
                    {children}
                </form>
            </div>
        </>
    );
}
