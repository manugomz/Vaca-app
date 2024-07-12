import React from 'react';
import Logo from './Logo';

const SingleGroup = ({ group, loading, children }) => {
    const styles = {
        container: `flex justify-around items-center
                shadow-sombra
                py-3 my-2 rounded-md
                md:pt-0 md:m-5
                md:flex-col md:w-72`,
        img: `flex justify-center items-center 
            size-[4.5em] rounded-md `,
        loadingRectangle: ' bg-zinc-200 rounded-md animate-pulse',
    };
    // Container
    if (group) {
        return (
            <div className={styles.container}>
                <div
                    className="flex items-center 
                                text-lg
                                md:w-full md:bg-brown-p md:p-2"
                >
                    <div className={styles.img} style={{ backgroundColor: group.color }}>
                        <Logo bg="transparent" h="50" w="55" />
                    </div>
                    <p className="hidden pl-2 text-white md:inline">{group.name}</p>
                </div>

                <div className="w-3/5 flex flex-col justify-between md:w-5/6">{children}</div>
            </div>
        );
    }
};

export default SingleGroup;
