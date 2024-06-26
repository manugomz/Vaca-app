import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

import SingleGroup from '../components/SingleGroup';
import EditGroupModal from '../components/EditGroupModal';

export default function GroupDetails() {
    const styles = {
        container: `justify-around items-center
                shadow-sombra
                px-5 py-3 my-2 rounded-md`,
        button: `bg-brown-p rounded-md px-3 py-1
                shadow-sombra
                text-white text-xs 
                hover:bg-zinc-300 
                focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p`,
    };

    const { id } = useParams();

    const [modalEditOpen, setModalEditOpen] = useState(false);

    const {
        data: singleGroup,
        loading,
        error,
        reFetch,
    } = useFetch('http://localhost:3000/groups/' + id);

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

    return (
        <main className="font-fredoka px-4">
            <section className="flex justify-around pt-5 py">
                <button className={styles.button}>Nuevo Gasto</button>
                <button className={styles.button}>Nuevo Amigo</button>
                <button className={styles.button} onClick={() => setModalEditOpen(true)}>
                    Editar Grupo
                </button>
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
                    Participantes: <strong style={{ color: singleGroup.color }}>8</strong>
                </p>
                <button className={styles.button + ' self-start mt-1'}>Eliminar grupo</button>
            </SingleGroup>

            <h2 className=" text-amber-400 text-lg">GASTOS</h2>
            <section>
                <h3>Enero 2024</h3>
                {group?.expenses?.map((expense) => {
                    return (
                        <div className={styles.container} key={expense.name}>
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
                                <button className={styles.button}>Editar</button>
                                <button className={styles.button}>Eliminar</button>
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
        </main>
    );
}
