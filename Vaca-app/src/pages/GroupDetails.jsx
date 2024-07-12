import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import SingleGroup from '../components/SingleGroup';
import EditGroupModal from '../components/Modals/EditGroupModal';
import DeleteGroupModal from '../components/Modals/DeleteGroupModal';
import AddFriendToGroup from '../components/Modals/AddFriendToGroupModal';

import useFetch from '../hooks/useFetch';
import useMutation from '../hooks/useMutation';
import CustomButton from '../components/CustomButton';

export default function GroupDetails() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { id } = useParams();

    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalAddFriendOpen, setModalAddFriendOpen] = useState(false);

    const deleteGroupMutation = useMutation(`${apiUrl}/groups/`, false, 'DELETE');

    const { data: singleGroup, loading, error, reFetch } = useFetch(`${apiUrl}/groups/` + id);

    const {
        data: usersGroup,
        loading: loadingUsersGroup,
        error: errorUsersGroup,
        reFetch: reFetchUsersGroup,
    } = useFetch(`${apiUrl}/usersgroup/` + id);

    const group = {
        total: 2000,
        members: ['Migue', 'Cesar', 'Lili'],
        element: 'Viaje a Cali',
        expenses: [
            { name: 'Desayuno', total: 50000, participation: 'paid', members: 3, whoPaid: 'you' },
            {
                name: 'Transporte',
                total: 2000,
                participation: 'none',
                members: 4,
                whoPaid: 'Pedro',
            },
            { name: 'Fiesta', total: 120000, participation: 'owe', members: 8, whoPaid: 'Lili' },
        ],
    };

    const deleteGroup = async (id) => {
        try {
            await deleteGroupMutation.mutate(null, id);
            reFetch();
        } catch {}
    };

    return (
        <main className="font-fredoka px-4">
            <section className="flex justify-around pt-5 pb-3">
                <CustomButton otherStyles="text-sm">Nuevo Gasto</CustomButton>
                <CustomButton
                    otherStyles="text-sm"
                    onClickFunction={() => setModalAddFriendOpen(true)}
                >
                    Nuevo Amigo
                </CustomButton>
                <CustomButton otherStyles="text-sm" onClickFunction={() => setModalEditOpen(true)}>
                    Editar Grupo
                </CustomButton>
            </section>

            <SingleGroup group={singleGroup}>
                <p>{singleGroup.name}</p>
                {group.total > 0 ? (
                    <p className="text-xs">
                        Te deben: <strong className="text-green-p">{group.total}</strong>
                    </p>
                ) : (
                    <p className="text-xs">
                        Debes: <strong className="text-red-p">{group.total}</strong>
                    </p>
                )}
                <p className="text-xs">
                    Participantes:{' '}
                    <strong style={{ color: singleGroup.color }}>{usersGroup.length}</strong>
                </p>
                <CustomButton
                    onClickFunction={() => setModalDeleteOpen(true)}
                    otherStyles="self-start mt-1 text-xs"
                >
                    Eliminar Grupo
                </CustomButton>
            </SingleGroup>

            <h2 className=" text-amber-400 text-lg">GASTOS</h2>
            <section>
                <h3>Enero 2024</h3>
                {group?.expenses?.map((expense) => {
                    return (
                        <div
                            className="justify-around items-center
                                        shadow-sombra
                                        px-5 py-3 my-2 rounded-md"
                            key={expense.name}
                        >
                            <p className="text-sm">
                                {expense.name} - participaron {expense.members} personas
                            </p>
                            <p className="text-sm text-zinc-700">
                                <span className="text-amber-400">
                                    {expense.whoPaid === 'you' ? 'Pagaste' : `${expense.whoPaid}`}
                                </span>
                                {expense.whoPaid === 'you' ? ' ' : ' pagó '}${expense.total}
                            </p>
                            <p className="text-sm">
                                {expense.participation === 'none' && 'no participé'}
                                {expense.participation === 'owe' && 'me prestaron'}
                                {expense.participation === 'paid' && 'presté'}
                            </p>
                            <div className="flex gap-3 pt-1">
                                <CustomButton otherStyles="text-xs">Editar</CustomButton>
                                <CustomButton otherStyles="text-xs">Eliminar</CustomButton>
                            </div>
                        </div>
                    );
                })}
            </section>
            {modalEditOpen && (
                <EditGroupModal
                    groupInfo={singleGroup}
                    onClose={() => setModalEditOpen(false)}
                    reFetch={reFetch}
                />
            )}
            {modalDeleteOpen && (
                <DeleteGroupModal
                    groupInfo={singleGroup}
                    onClose={() => setModalDeleteOpen(false)}
                    reFetch={reFetch}
                />
            )}
            {modalAddFriendOpen && (
                <AddFriendToGroup
                    groupId={id}
                    onClose={() => setModalAddFriendOpen(false)}
                    reFetch={reFetch}
                />
            )}
        </main>
    );
}
