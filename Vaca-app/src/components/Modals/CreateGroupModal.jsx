import React, { useState } from 'react';

import CustomButton from '../CustomButton';

import useMutation from '../../hooks/useMutation';

import ColorSelector from '../ColorSelector';
import Modal from './Modal';

export default function CreateGroupModal({ onClose, reFetch, setToastOpen, setToastMessage }) {
    const style = {
        nameInput: `w-full my-2 pr-8 rounded-md border-slate-400 border-2 p-1 px-3`,
    };

    const [errors, setErrors] = useState(null);
    const [newGroup, setNewGroup] = useState({
        name: '',
        color: '#FFF',
    });

    const createGroupMutation = useMutation('http://localhost:3000/groups/');

    const handleInputChange = (event) => {
        setErrors(null);
        const { name, value } = event.target;
        setNewGroup({
            ...newGroup,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createGroupMutation.mutate(newGroup);
            setToastMessage('Grupo creado exitosamente');
            onClose();
            reFetch();
            setToastOpen(true);
        } catch (e) {
            setErrors(e.message.split(','));
        }
    };

    return (
        <Modal onClose={onClose} method="POST">
            <fieldset className="flex flex-col items-center">
                <label htmlFor="name" className="text-center text-brown-p">
                    Nuevo Grupo
                </label>
                <div className="relative">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        maxLength="30"
                        className={style.nameInput}
                        value={newGroup.name}
                        onChange={handleInputChange}
                        autoFocus
                        required
                        placeholder="Dale un nombre al grupo"
                    />
                    <img
                        src="../../src/assets/people.svg"
                        alt="people icon"
                        className="absolute top-3 right-2"
                    />
                </div>
            </fieldset>
            <ColorSelector group={newGroup} setGroup={setNewGroup} />
            <CustomButton
                type="submit"
                onClickFunction={handleSubmit}
                disabled={!!errors || !newGroup.name}
                otherStyles="mt-2"
            >
                Crear
            </CustomButton>

            <div className="text-red-p text-sm text-center h-[34px]">
                {errors?.map((error, i) => (
                    <p key={i}>{error}</p>
                ))}
            </div>
        </Modal>
    );
}
