import React from 'react';
import useFetch from '../hooks/useFetch';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';

const apiUrl = import.meta.env.VITE_API_URL;

const Friends = () => {
    const styles = {
        container: 'font-fredoka p-4 flex flex-col md:px-16 lg:px-24',
        friendsContainer: `flex justify-between items-center
                shadow-sombra
                p-3 my-2 rounded-md
                md:m-5
                md:flex-col md:w-72`,
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
                    <CustomButton otherStyles="w-1/3 max-w-48 text-sm self-end">Nuevo Amigo</CustomButton>
                </div>
                <div
                    className="w-full flex flex-col 
                        md:grid md:grid-cols-2 md:justify-around 
                        md:px-3
                        xl:grid-cols-3"
                >
                    {
                        //* --------------- friends skeletons-------------------
                    }
                    <div className={styles.friendsContainer}>
                        <div
                            className="flex items-center 
                                        gap-4
                                        md:text-lg 
                                        w-full md:bg-brown-p md:p-4"
                        >
                            <div className={styles.img + 'bg-zinc-300'}>
                                <Logo bg="transparent" h="50" w="55" />
                            </div>
                            <div className=" w-2/3">
                                <div
                                    className={styles.loadingRectangle + ' w-40 md:w-32 h-6'}
                                ></div>
                                <div
                                    className={styles.loadingRectangle + ' w-40 h-4 mt-2 md:hidden'}
                                ></div>
                            </div>
                        </div>
                        <div
                            className={
                                styles.loadingRectangle +
                                ' w-40 h-4 mt-2 md:pt-2 text-sm overflow-hidden hidden md:flex'
                            }
                        ></div>
                    </div>
                    <div className={styles.friendsContainer}>
                        <div
                            className="flex items-center 
                                        gap-4
                                        md:text-lg 
                                        w-full md:bg-brown-p md:p-4"
                        >
                            <div className={styles.img + 'bg-zinc-300'}>
                                <Logo bg="transparent" h="50" w="55" />
                            </div>
                            <div className=" w-2/3 md:w-auto">
                                <div
                                    className={styles.loadingRectangle + ' w-40 md:w-32 h-6'}
                                ></div>
                                <div
                                    className={styles.loadingRectangle + ' w-40 h-4 mt-2 md:hidden'}
                                ></div>
                            </div>
                        </div>
                        <div
                            className={
                                styles.loadingRectangle +
                                ' w-40 h-4 mt-2 md:pt-2 text-sm overflow-hidden hidden md:flex'
                            }
                        ></div>
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
                    <CustomButton otherStyles="w-1/3 max-w-48 text-sm self-end">Nuevo Amigo</CustomButton>
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
                                                    gap-4
                                                    md:text-lg 
                                                    w-full md:bg-brown-p md:p-4"
                                    >
                                        <div
                                            className={styles.img}
                                            style={{ backgroundColor: '#FEA3E2' }}
                                        >
                                            <Logo bg="transparent" h="50" w="55" />
                                        </div>
                                        <div className="overflow-clip w-2/3 md:w-auto">
                                            <p className=" text-brown-p md:text-white ">
                                                {user.name}
                                            </p>
                                            <p className="text-zinc-700 text-sm md:hidden">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:pt-2 text-sm overflow-hidden hidden md:flex">
                                        {user.email}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </main>
        );
    }
};

export default Friends;
