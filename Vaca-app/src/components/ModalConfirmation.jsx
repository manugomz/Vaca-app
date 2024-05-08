import React, { useState } from "react";
import { IoClose, IoAlertCircle } from "react-icons/io5";

//TODO change message when send form and check radio buttons

export default function ModalConfirmation({ onClose, onDelete, id }) {
  const style = {
    buttonNo: `text-white
            bg-brown-p rounded-md 
            mt-2 py-1 
            w-1/3`,
    buttonYes: `text-brown-p
            bg-white rounded-md 
            border-brown-p border-2
            mt-2 py-1 
            w-1/3`,
    modalBackground: `fixed left-0 top-0 
                    flex justify-center 
                    w-full h-full 
                    bg-[rgb(0,0,0,0.5)]
                    font-fredoka`,
    modal: `flex flex-col self-center justify-self-center
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
          <button type="submit" className={style.buttonNo}>
            No
          </button>
        </div>
      </dialog>
    </div>
  );
}
