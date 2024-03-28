import React from 'react';
import Logo from './Logo';
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='font-fredoka bg-cafe text-white py-3 px-5 md:flex md: justify-between'>
        <div className='flex justify-between'>
            <div className='flex items-baseline'>
                <Logo /> 
                <h1 className="text-xl ml-2 md:text-3xl">Mi Vaquita</h1>
            </div>
            <IoPersonCircleSharp className="text-4xl md:hidden"/>
        </div>
        <nav>
            <ul className='flex justify-between py-3 text-lg'>
                
                <li><Link className='p-2' to='Amigos'>Amigos</Link></li>
                <li><Link className='p-2' to='Gastos'>Gastos</Link></li>
                <li><Link className='p-2' to='Grupos'>Grupos</Link></li>
            </ul>
        </nav>
        <IoPersonCircleSharp className="text-4xl hidden md:inline"/>
    </div>
  )
}

export default Header

