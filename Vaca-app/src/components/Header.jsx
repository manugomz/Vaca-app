import React from 'react';
import Logo from './Logo';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    return (
        <div className="font-fredoka bg-brown-p text-white py-3 px-5 md:flex md: justify-between">
            <div className="flex justify-between">
                <div className="flex items-baseline">
                    <Logo />
                    <h1 className="text-xl ml-2 md:text-3xl">Mi Vaquita</h1>
                </div>
                <IoPersonCircleSharp className="text-4xl md:hidden" onClick={()=>{}} />
                {
                    //TODO: ADD USERINFO OPTION
                }
            </div>
            <nav>
                <ul className="flex justify-between py-3 text-lg">
                    <li className="hover:border-b-1 border-white rounded-sm">
                        <Link className="p-2" to="/amigos">
                            Amigos
                        </Link>
                    </li>
                    <li className="hover:border-b-1 border-white rounded-sm">
                        <Link className="p-2" to="/gastos">
                            Gastos
                        </Link>
                    </li>
                    <li className="hover:border-b-1 border-white rounded-sm">
                        <Link className="p-2" to="/grupos">
                            Grupos
                        </Link>
                    </li>
                </ul>
            </nav>
            <IoPersonCircleSharp className="text-4xl hidden md:inline" />
        </div>
    );
};

export default Header;
