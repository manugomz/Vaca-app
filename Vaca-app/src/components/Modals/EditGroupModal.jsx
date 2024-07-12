import React, { useState } from 'react';

import useMutation from '../../hooks/useMutation';

import ColorSelector from '../ColorSelector';
import Modal from './Modal';
import CustomButton from '../CustomButton';

export default function EditGroupModal({ onClose, reFetch, groupInfo }) {
    const [errors, setErrors] = useState(null);
    const [group, setGroup] = useState({
        ownerUserId: 1,
        name: groupInfo.name,
        color: groupInfo.color,
    });

    const updateGroupMutation = useMutation(
        'http://localhost:3000/groups/' + groupInfo.id,
        false,
        'PUT',
    );

    const handleInputChange = (event) => {
        setErrors(null);
        const { name, value } = event.target;
        setGroup({
            ...group,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateGroupMutation.mutate(group);
            onClose();
            reFetch();
        } catch (e) {
            setErrors(e.message.split(','));
        }
    };

    return (
        <Modal onClose={onClose} method="POST">
            <fieldset className="flex flex-col">
                <label htmlFor="name" className="text-center text-brown-p">
                    Nuevo Grupo
                </label>
                <div className="relative">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        maxLength="30"
                        className="w-full rounded-md border-slate-400 border-2 
                                    my-2 p-1 px-3 pr-8"
                        value={group.name}
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
            <ColorSelector group={group} setGroup={setGroup} />
            <CustomButton
                type="submit"
                onClickFunction={handleSubmit}
                disabled={!!errors || !group.name}
            >
                Actualizar
            </CustomButton>

            <div className="text-red-p text-xs text-center h-[32px]">
                {errors?.map((error, i) => (
                    <p key={i}>{error}</p>
                ))}
            </div>
        </Modal>
    );
}
