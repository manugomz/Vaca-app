import React, { useState } from 'react';

import useMutation from '../../hooks/useMutation';

import Modal from './Modal';
import CustomButton from '../CustomButton';

export default function DeleteGroupModal({ onClose, groupInfo }) {
    const [error, setError] = useState('');


    return (
        <Modal onClose={onClose} method="DELETE">
            <p className="text-center text-brown-p">Eliminar Grupo</p>
            <p className="text-center text-sm text-slate-800 pt-2">
                ¿Está seguro que desea borrar el grupo? Toda la información se perderá.
            </p>
            <div className="w-full flex justify-around pt-2">
                <CustomButton
                    type="submit"
                    onClickFunction={() => {
                        onDelete(id);
                        onClose(true);
                    }}
                    variant="secondary"
                >
                    Eliminar
                </CustomButton>
                <CustomButton
                    onClickFunction={() => {
                        onClose(true);
                    }}
                >
                    Cancelar
                </CustomButton>
            </div>
            <p className="text-center text-red-p text-sm">{error}</p>
        </Modal>
    );
}
