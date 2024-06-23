import React from 'react';
import Logo from './Logo';

const SingleGroup = ({ group, loading, children }) => {
    const styles = {
        container: `flex justify-around items-center
                shadow-sombra
                py-3 my-2 rounded-md`,
        img: `flex justify-center items-center 
            size-[4.5em] rounded-md `,
        loadingRectangle: ' bg-zinc-400 rounded-md animate-pulse',
        loadingButton: ' text-zinc-400 px-3 py-1 shadow-sombra text-xs',
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div
                    className={
                        styles.loadingRectangle + ' size-[4.5em] flex justify-center items-center'
                    }
                >
                    <Logo bg="transparent" h="50" w="55" />
                </div>
                <div className="w-3/5 flex flex-col justify-between">
                    <div className={styles.loadingRectangle + ' w-1/2 h-[30%]'}></div>
                    <div className={styles.loadingRectangle + ' w-1/4 h-[20%] mt-1'}></div>
                    <div className="flex gap-3 pt-2">
                        <button className={styles.loadingButton + styles.loadingRectangle}></button>
                        <button className={styles.loadingButton + styles.loadingRectangle}></button>
                    </div>
                </div>
            </div>
        );

        // Container
    } else if (group) {
        return (
            <div className={styles.container}>
                <div className={styles.img} style={{ backgroundColor: group.color }}>
                    <Logo bg="transparent" h="50" w="55" />
                </div>
                <div className="w-3/5 flex flex-col justify-between">{children}</div>
            </div>
        );
    }
};

export default SingleGroup;
