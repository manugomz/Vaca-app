import React from 'react';
import useFetch from '../hooks/useFetch';
import Logo from '../components/Logo';

const apiUrl = import.meta.env.VITE_API_URL;

const Friends = () => {
    const styles = {
        container: 'font-fredoka p-4 flex flex-col md:px-16 lg:px-24',
        friendsContainer: `flex justify-around items-center
                shadow-sombra
                p-3 my-2 rounded-md
                md:m-5
                md:flex-col md:w-72`,
        button: `bg-brown-p rounded-md
                min-w-20 px-3 py-1 max-w-40
                shadow-sombra 
                text-white text-xs 
                md:text-base
                hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
                focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p
                active:outline-none active:bg-zinc-300 active:ring-brown-p
                md:py-2`,
        img: `flex justify-center items-center
            size-[4.5em] rounded-md `,
        loadingRectangle: 'bg-zinc-200 rounded-md animate-pulse',
    };

    const { data: users, loading, error, reFetch } = useFetch(`${apiUrl}/users/`);

    const currentUser = JSON.parse(window.sessionStorage.user);

    const userFriends = users.filter((user) => user.userid !== currentUser.userid);

    if (loading) {
        return (
            <main className={styles.container + ' animate-pulse'}>
                <div
                    className="w-full flex
                    justify-end items-center
                    md:justify-between md:my-[4vh]"
                >
                    <h2 className="text-4xl hidden md:inline">Amigos</h2>
                    <button
                        data-modal-target="crud-modal"
                        data-modal-toggle="crud-modal"
                        type="button"
                        className={styles.button}
                    >
                        Nuevo amigo
                    </button>
                </div>
                <div
                    className="w-full flex flex-col 
                        md:grid md:grid-cols-2 md:justify-around 
                        md:px-3
                        xl:grid-cols-3"
                >
                    <div className={styles.friendsContainer}>
                        <div
                            className="flex items-center 
                                                        text-lg
                                                        md:w-full md:bg-brown-p md:p-4"
                        >
                            <div className={styles.img + 'bg-zinc-300'}>
                                <Logo bg="transparent" h="50" w="55" />
                            </div>
                            <div className={styles.loadingRectangle + ' ml-5 w-40 h-6 mt-1'}></div>
                        </div>
                        <div className="w-3/5 flex flex-col justify-between md:w-5/6"></div>
                    </div>
                    <div className={styles.friendsContainer}>
                        <div
                            className="flex items-center 
                                                        text-lg
                                                        md:w-full md:bg-brown-p md:p-4"
                        >
                            <div className={styles.img + 'bg-zinc-300'}>
                                <Logo bg="transparent" h="50" w="55" />
                            </div>
                            <div className={styles.loadingRectangle + ' ml-5 w-40 h-6 mt-1'}></div>
                        </div>
                        <div className="w-3/5 flex flex-col justify-between md:w-5/6"></div>
                    </div>
                </div>
            </main>
        );
    } else if (error) {
        navigate(`/login`);
        //*-------------------------------------------GROUPS-------------------------------------------------
    } else if (users) {
        return (
            <main className={styles.container}>
                <div
                    className="w-full flex
                    justify-end items-center
                    md:justify-between md:my-[4vh]"
                >
                    <h2 className="text-4xl hidden md:inline">Amigos</h2>
                    <button
                        data-modal-target="crud-modal"
                        data-modal-toggle="crud-modal"
                        type="button"
                        className={styles.button + ' w-1/3 text-sm self-end'}
                    >
                        Nuevo amigo
                    </button>
                </div>

                <div
                    className="w-full flex flex-col 
                        md:grid md:grid-cols-2 md:justify-around 
                        md:px-3
                        xl:grid-cols-3"
                >
                    {users &&
                        userFriends.map((user) => {
                            return (
                                <div className={styles.friendsContainer} key={user.userid}>
                                    <div
                                        className="flex items-center 
                                                        text-lg
                                                        md:w-full md:bg-brown-p md:p-4"
                                    >
                                        <div
                                            className={styles.img}
                                            style={{ backgroundColor: '#FEA3E2' }}
                                        >
                                            <Logo bg="transparent" h="50" w="55" />
                                        </div>
                                        <p className="pl-2 text-brown-p md:text-white ">
                                            {user.name}
                                        </p>
                                    </div>
                                    <div className="w-3/5 flex flex-col justify-between md:w-5/6"></div>
                                </div>
                            );
                        })}
                </div>
            </main>
        );
    }
};

export default Friends;
