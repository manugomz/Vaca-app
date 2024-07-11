import React from 'react';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateGroupModal from '../components/Modals/CreateGroupModal';
import ModalConfirmation from '../components/Modals/ModalConfirmation';
import SingleGroup from '../components/SingleGroup';
import Toast from '../components/Toast';

const apiUrl = import.meta.env.VITE_API_URL;

const Groups = () => {
    const styles = {
        button: `bg-brown-p rounded-md
        min-w-20 px-3 py-1 max-w-40
        shadow-sombra 
        text-white text-xs 
        md:text-base
        hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
        focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p
        active:outline-none active:bg-zinc-300 active:ring-brown-p
        md:py-2`,
        container: 'font-fredoka p-4 flex flex-col md:px-16 lg:px-24',
        groupsContainer: `w-full flex flex-col 
                                md:grid md:grid-cols-2 md:justify-around 
                                md:px-3
                                xl:grid-cols-3
                                2xl:grid-cols-4`,
        loadingRectangle: 'bg-zinc-200 rounded-md animate-pulse',
        loadingButton: 'bg-zinc-300 rounded-md text-white px-3 py-1 shadow-sombra text-xs',
    };

    const [currentId, setCurrentId] = useState(0);
    const [modalCreateOpen, setModalCreateOpen] = useState(false);
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    const navigate = useNavigate();

    const { data: groups, loading, error, reFetch } = useFetch(`${apiUrl}/groups/`);

    const total = -50_000;

    const onCloseToast = () => {
        setToastOpen(false);
        setToastMessage(null);
    };

    //*--------------------------------------------LOADER------------------------------------------------
    if (loading) {
        return (
            <main className={styles.container + ' animate-pulse'}>
                <div
                    className="flex justify-end items-center
                    w-full
                    md:justify-between md:my-[4vh]"
                >
                    <p className="text-4xl hidden md:inline">GRUPOS</p>
                    <button className={styles.button + ' opacity-50 self-end'}>Nuevo grupo</button>
                </div>
                <div className="md:my-[3vh]">
                    <div className={styles.loadingRectangle + ' w-1/6 h-5 mt-1'}></div>
                    <div className={styles.loadingRectangle + ' w-1/5 h-5 mt-1'}></div>
                </div>
                <div className={styles.groupsContainer}>
                    <SingleGroup loading={loading} group={{ name: ' ', color: 'rgb(228 228 231)' }}>
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
                    {error === 'Request failed with status code 401' ? (
                        navigate(`/login`)
                    ) : (
                        <p>{error}</p>
                    )}
                </div>
            </div>
        );
        //*-------------------------------------------GROUPS-------------------------------------------------
    } else if (groups) {
        return (
            <main className={styles.container}>
                <div
                    className="flex justify-end items-center
                    w-full
                    md:justify-between md:my-[4vh]"
                >
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
                <div className={styles.groupsContainer}>
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
                                                    className="w-full pl-1"
                                                >
                                                    {` ${7} miembros`}
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
                        setToastOpen={setToastOpen}
                        setToastMessage={setToastMessage}
                    />
                )}
                {toastOpen && (
                    <Toast message={toastMessage} onClose={onCloseToast} isOpen={toastOpen} />
                )}
            </main>
        );
    }
};

export default Groups;
