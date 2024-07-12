import React from 'react';
import { IoClose, IoAlertCircle } from 'react-icons/io5';
import CustomButton from '../CustomButton';

export default function ModalConfirmation({ onClose, onDelete, id }) {
    const style = {
        modalBackground: `fixed left-0 top-0 
                    flex justify-center 
                    w-full h-full 
                    bg-[rgb(0,0,0,0.5)]
                    font-fredoka`,
        modal: `flex flex-col self-center 
                pt-4 pb-6 px-8
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
                <p className="pt-2">¿está seguro que desea abandonar el grupo?</p>
                <div className="w-full flex justify-around pt-5">
                    <CustomButton
                        variant="secondary"
                        type="submit"
                        onClickFunction={() => {
                            //onDelete(id);
                            onClose(true);
                        }}
                    >
                        Sí
                    </CustomButton>
                    <CustomButton
                        onClickFunction={() => {
                            onClose(true);
                        }}
                    >
                        No
                    </CustomButton>
                </div>
            </dialog>
        </div>
    );
}
