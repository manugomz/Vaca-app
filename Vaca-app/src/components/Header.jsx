import React from 'react';
import Logo from './Logo';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Header = () => {
    const styles = {
        headerContainer: `bg-brown-p
                        font-fredoka text-white 
                        py-3 px-5 
                        md:flex md:justify-between md:items-center`,
        li: `border-white rounded-sm 
            md:hover:border-b-4 md:text-xl 
            lg:hover`,
        navigation: `flex justify-evenly 
                    py-3 
                    text-lg 
                    md:w-full md:justify-between`,
        title: 'text-xl ml-2 md:text-3xl',
    };

    return (
        <div className={styles.headerContainer}>
            <div className="flex justify-between">
                <div className="flex items-baseline">
                    <Logo />
                    <h1 className={styles.title}>Mi Vaquita</h1>
                </div>
                <IoPersonCircleSharp className="text-4xl md:hidden" onClick={() => {}} />
                {
                    //TODO: ADD USERINFO OPTION
                }
            </div>
            <nav className="md:w-5/12 lg:w-1/3">
                <ul className={styles.navigation}>
                    <li className={styles.li}>
                        <Link to="/amigos">Amigos</Link>
                    </li>
                    <li className={styles.li}>
                        <Link to="/gastos">Gastos</Link>
                    </li>
                    <li className={styles.li}>
                        <Link to="/grupos">Grupos</Link>
                    </li>
                </ul>
            </nav>
            <IoPersonCircleSharp className="text-4xl hidden md:inline" />
        </div>
    );
};

export default Header;
