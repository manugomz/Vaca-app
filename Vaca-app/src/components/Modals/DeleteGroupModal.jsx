import React, { useState } from 'react';

import useMutation from '../../hooks/useMutation';

import Modal from './Modal';

export default function DeleteGroupModal({ onClose, groupInfo }) {
    const [error, setError] = useState('');

    const style = {
        button: `bg-brown-p rounded-md 
                w-1/3 px-3 py-1 my-2
                shadow-sombra
                text-white text-xs 
                hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
                focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p`,
        modalBackground: `fixed left-0 top-0 
                flex justify-center 
                w-full h-full 
                bg-[rgb(0,0,0,0.5)]
                font-fredoka`,
    };

    return (
        <Modal onClose={onClose} method="DELETE">
            <p className="text-center text-brown-p">Eliminar Grupo</p>
            <p className="text-center text-sm text-slate-800 pt-2">
                ¿Está seguro que desea borrar el grupo? Toda la información se perderá.
            </p>
            <div className="w-full flex justify-around pt-2">
                <button
                    type="submit"
                    className={style.button}
                    onClick={() => {
                        onDelete(id);
                        onClose(true);
                    }}
                >
                    Eliminar
                </button>
                <button
                    type="submit"
                    className={style.button}
                    onClick={() => {
                        onClose(true);
                    }}
                >
                    Cancelar
                </button>
            </div>
            <p className="text-center text-red-p text-sm">{error}</p>
        </Modal>
    );
}
