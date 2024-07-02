import React from 'react';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMutation from '../hooks/useMutation';

import Logo from '../components/Logo';
import CreateGroupModal from '../components/CreateGroupModal';
import ModalConfirmation from '../components/ModalConfirmation';
import SingleGroup from '../components/SingleGroup';

//? TODO: Responsive for WEB (Buttons hover and click animations)

const apiUrl = import.meta.env.VITE_API_URL;

const Groups = () => {
    const styles = {
        container: 'font-fredoka p-4 flex flex-col',
        loadingRectangle: 'bg-zinc-400 rounded-md animate-pulse',
        loadingButton: ' text-zinc-400 px-3 py-1 shadow-sombra text-xs',
        button: `bg-brown-p rounded-md
            min-w-20 px-3 py-1
            shadow-sombra 
            text-white text-xs 
            hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
            focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p
            active:outline-none active:bg-zinc-300 active:ring-brown-p`,
    };

    const [modalOpen, setModalOpen] = useState(false);
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
            <main className={styles.container + ' animate-pulse bg-zinc-100'}>
                <button className={styles.button}>Nuevo grupo</button>
                <div>
                    <div className={styles.loadingRectangle + ' w-1/6 h-5 mt-1'}></div>
                    <div className={styles.loadingRectangle + ' w-1/5 h-5 mt-1'}></div>
                </div>
                <div className="flex justify-around shadow-sombra py-3 my-2 rounded-md">
                    <div
                        className={
                            styles.loadingRectangle +
                            ' flex justify-center items-center size-[4.5em]'
                        }
                    >
                        <Logo bg="transparent" h="50" w="55" />
                    </div>
                    <div className="flex flex-col justify-between w-3/5">
                        <div className={styles.loadingRectangle + ' w-1/2 h-[30%]'}></div>
                        <div className={styles.loadingRectangle + ' w-1/4 h-[20%] mt-1'}></div>
                        <div className="flex pt-2 gap-3">
                            <button className={styles.loadingRectangle + styles.loadingButton}>
                                Editar
                            </button>
                            <button className={styles.loadingRectangle + styles.loadingButton}>
                                Eliminar
                            </button>
                        </div>
                    </div>
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
                {modalOpen && (
                    <CreateGroupModal
                        reFetch={reFetch}
                        onClose={() => {
                            setModalOpen(false);
                        }}
                    />
                )}
                <button
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    type="button"
                    className={styles.button + ' w-1/3 text-sm self-end'}
                    onClick={() => setModalOpen(true)}
                >
                    Nuevo grupo
                </button>
                <div>
                    <p className="">Debes</p>
                    <p className="text-red-p text-xl">$45.000</p>
                </div>
                {groups &&
                    groups.map((group) => {
                        return (
                            <SingleGroup
                                group={group}
                                key={group.name}
                                loading={loading}
                                error={error}
                            >
                                <p>{group.name}</p>
                                {total > 0 ? (
                                    <p className="text-xs">
                                        Te deben: <strong className="text-green-p">{total}</strong>
                                    </p>
                                ) : (
                                    <p className="text-xs">
                                        Debes:{' '}
                                        <strong className="text-red-p">
                                            {total.toString().slice(1)}
                                        </strong>
                                    </p>
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
            </main>
        );
    }
};

export default Groups;
