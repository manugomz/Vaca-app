import React from 'react';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMutation from '../hooks/useMutation';

import CreateGroupModal from '../components/Modals/CreateGroupModal';
import ModalConfirmation from '../components/Modals/ModalConfirmation';
import SingleGroup from '../components/SingleGroup';

const apiUrl = import.meta.env.VITE_API_URL;

const Groups = () => {
    const styles = {
        container: 'font-fredoka p-4 flex flex-col md:px-16 lg:px-24',
        loadingRectangle: 'bg-zinc-400 rounded-md animate-pulse',
        loadingButton: 'bg-zinc-400 rounded-md text-white px-3 py-1 shadow-sombra text-xs',
        button: `bg-brown-p rounded-md
            min-w-20 px-3 py-1 max-w-40
            shadow-sombra 
            text-white text-xs 
            hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
            focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p
            active:outline-none active:bg-zinc-300 active:ring-brown-p
            md:py-2`,
    };

    const [modalCreateOpen, setModalCreateOpen] = useState(false);
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [currentId, setCurrentId] = useState(0);

    const navigate = useNavigate();

    const { data: groups, loading, error, reFetch } = useFetch(`${apiUrl}/groups/`);

    const deleteGroupMutation = useMutation(`${apiUrl}/groups/`, false, 'DELETE');

    const total = -50_000;

    const deleteGroup = async (id) => {
        // try {
        //     await deleteGroupMutation.mutate(null, id);
        //     reFetch();
        // } catch {}
    };
    //*--------------------------------------------LOADER------------------------------------------------
    if (loading) {
        return (
            <main className={styles.container + ' animate-pulse'}>
                <div className="w-full flex justify-between md:my-[4vh] px-5">
                    <p className="text-4xl hidden md:inline">GRUPOS</p>
                    <button className={styles.button + ' opacity-50 self-end'}>Nuevo grupo</button>
                </div>
                <div className="md:my-[3vh]">
                    <div className={styles.loadingRectangle + ' w-1/12 h-5 mt-1'}></div>
                    <div className={styles.loadingRectangle + ' w-1/6 h-5 mt-1'}></div>
                </div>
                <div
                    className="w-full flex flex-col 
                                md:grid md:grid-cols-2 md:justify-around 
                                md:px-3
                                lg:grid-cols-3
                                xl:grid-cols-4"
                >
                    <SingleGroup loading={loading} group={{ name: ' ', color: '#a1a1aa' }}>
                        <div className={styles.loadingRectangle + ' w-4/6 h-5 my-2'}></div>
                        <div className={styles.loadingRectangle + ' w-4/6 h-5 mb-2'}></div>
                        <div className="flex gap-3 pt-1">
                            <button className={styles.loadingButton}>Editar</button>
                            <button className={styles.loadingButton}>Eliminar</button>
                        </div>
                    </SingleGroup>
                </div>
            </main>
        );
        //*-------------------------------------------------------------------------------------------------
    } else if (error) {
        return (
            <div className="font-fredoka flex flex-col">
                <div className="text-3xl text-center pt-2">Oops! there was an error</div>
                <div className="text-zinc-600 text-xs text-center pt-2 w-2/3 self-center">
                    {error}
                </div>
            </div>
        );
        //*-------------------------------------------GROUPS-------------------------------------------------
    } else if (groups) {
        return (
            <main className={styles.container}>
                <div className="w-full flex justify-between md:my-[4vh] items-center">
                    <h2 className="text-4xl hidden md:inline">GRUPOS</h2>
                    <button
                        data-modal-target="crud-modal"
                        data-modal-toggle="crud-modal"
                        type="button"
                        className={styles.button + ' w-1/3 text-sm self-end'}
                        onClick={() => setModalCreateOpen(true)}
                    >
                        Nuevo grupo
                    </button>
                </div>
                <div className="md:my-[3vh]">
                    <p className="">Debes</p>
                    <p className="text-red-p text-xl">$45.000</p>
                </div>
                <div
                    className="w-full flex flex-col 
                                md:grid md:grid-cols-2 md:justify-around 
                                md:px-3
                                xl:grid-cols-3"
                >
                    {groups &&
                        groups.map((group) => {
                            return (
                                <SingleGroup
                                    group={group}
                                    key={group.name}
                                    loading={loading}
                                    error={error}
                                >
                                    <p className="md:hidden">{group.name}</p>
                                    {total > 0 ? (
                                        <p className="text-xs md:pt-2">
                                            Te deben:{' '}
                                            <strong className="text-green-p">${total}</strong>
                                        </p>
                                    ) : (
                                        <>
                                            <p className="text-xs md:pt-2 md:text-base">
                                                Debes:{' '}
                                                <strong className="text-red-p">
                                                    ${total.toString().slice(1)}
                                                </strong>
                                            </p>
                                            <p className="hidden text-xs md:text-base md:flex">
                                                Participantes:
                                                <strong
                                                    style={{ color: group.color }}
                                                    className="w-full"
                                                >
                                                    {`${7} miembros`}
                                                </strong>
                                            </p>
                                        </>
                                    )}

                                    <div className="flex gap-3 pt-1">
                                        <button
                                            className={styles.button}
                                            onClick={() => {
                                                navigate(`/grupos/${group.id}`);
                                            }}
                                        >
                                            Ver
                                        </button>

                                        <button
                                            className={styles.button}
                                            onClick={() => {
                                                setModalConfirmOpen(true);
                                                setCurrentId(group.id);
                                            }}
                                        >
                                            Abandonar
                                        </button>
                                    </div>
                                </SingleGroup>
                            );
                        })}
                </div>
                {modalConfirmOpen && (
                    <ModalConfirmation
                        id={currentId}
                        onDelete={deleteGroup}
                        onClose={() => {
                            setCurrentId(0);
                            setModalConfirmOpen(false);
                        }}
                    />
                )}
                {modalCreateOpen && (
                    <CreateGroupModal
                        reFetch={reFetch}
                        onClose={() => {
                            setModalCreateOpen(false);
                        }}
                    />
                )}
            </main>
        );
    }
};

export default Groups;
