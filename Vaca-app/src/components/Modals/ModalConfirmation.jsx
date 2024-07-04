import React from 'react';
import { IoClose, IoAlertCircle } from 'react-icons/io5';

//TODO change message when send form and check radio buttons

export default function ModalConfirmation({ onClose, onDelete, id }) {
    const style = {
        buttonNo: `bg-brown-p rounded-md 
            w-1/3 mt-2 py-1 
            shadow-sombra
            text-white
            hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
            focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p`,
        buttonYes: `bg-white rounded-md 
            w-1/3 mt-2 py-1 
            text-brown-p
            border-brown-p border-2
            hover:bg-zinc-100 hover:ring-2 hover:ring-brown-p hover:border-zinc-100
            focus:bg-zinc-300 focus:ring-2 focus:ring-white focus:border-brown-p`,

        modalBackground: `fixed left-0 top-0 
                    flex justify-center 
                    w-full h-full 
                    bg-[rgb(0,0,0,0.5)]
                    font-fredoka`,
        modal: `flex flex-col self-center 
                py-4 px-8 gap-3
                w-80
                bg-white rounded-md
                text-center`,
    };

    return (
        <div className={style.modalBackground}>
            <dialog autoFocus className={style.modal}>
                <button className="self-end" type="reset" onClick={() => onClose()}>
                    <IoClose />
                </button>

                <IoAlertCircle className="text-5xl text-amber-400 w-full" />
                <p>¿está seguro que desea eliminar el grupo?</p>
                <div className="w-full flex justify-around">
                    <button
                        type="submit"
                        className={style.buttonYes}
                        onClick={() => {
                            onDelete(id);
                            onClose(true);
                        }}
                    >
                        Sí
                    </button>
                    <button
                        type="submit"
                        className={style.buttonNo}
                        onClick={() => {
                            onClose(true);
                        }}
                    >
                        No
                    </button>
                </div>
            </dialog>
        </div>
    );
}
