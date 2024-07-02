import React, { useState } from 'react';

import useMutation from '../hooks/useMutation';

import ColorSelector from './ColorSelector';
import Modal from './Modal';

export default function CreateGroupModal({ onClose, reFetch }) {
    const style = {
        createButton: `bg-brown-p rounded-md 
                px-3 py-1 mt-2
                shadow-sombra
                text-white text-xs 
                hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
                focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p disabled:opacity-50`,
        nameInput: `w-full my-2 pr-8 rounded-md border-slate-400 border-2 p-1 px-3`,
    };

    const [errors, setErrors] = useState(null);
    const [newGroup, setNewGroup] = useState({
        ownerUserId: 1,
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
            onClose();
            reFetch();
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
            <button
                type="submit"
                className={style.createButton}
                onClick={handleSubmit}
                disabled={!!errors || !newGroup.name}
            >
                Crear
            </button>

            <div className="text-red-p text-sm text-center h-[34px]">
                {errors?.map((error, i) => (
                    <p key={i}>{error}</p>
                ))}
            </div>
        </Modal>
    );
}
