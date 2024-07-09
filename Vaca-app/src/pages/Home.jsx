import React from 'react';
import Logo from '../components/Logo';

export default function Home() {
    const styles = {
        container: `flex flex-col 
                    w-full h-full items-center justify-center pt-20 
                    font-fredoka p-4 
                    md:flex-row md:gap-10
                    lg:px-24`,
        friendsContainer: `flex justify-around items-center
                shadow-sombra
                py-3 my-2 rounded-md
                md:pt-0 md:m-5
                md:flex-col md:w-72`,
        button: `bg-brown-p rounded-md  self-end
            min-w-20 px-3 py-1 md:w-1/4
            shadow-sombra 
            text-white text-xs 
            md:text-base
            hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
            focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p
            active:outline-none active:bg-zinc-300 active:ring-brown-p
            md:py-2`,
        img: `flex justify-center items-center 
            size-[4.5em] rounded-md `,
    };

    const user = JSON.parse(window.sessionStorage.user);

    return (
        <main className={styles.container}>
            <Logo h="180" w="230" />
            <div>
                <p className="text-2xl md:text-3xl text-center pt-5">¡Bienvenidx {user.name}!</p>
                <p className="md:text-xl text-center">¿qué deseas hacer hoy?</p>
            </div>
        </main>
    );
}
