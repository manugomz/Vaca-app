import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoDecoration from '../assets/LogoDecoration.svg?react';
import useMutation from '../hooks/useMutation';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Login() {
    const style = {
        input: `w-full my-4 rounded-md border-slate-400 border-2 py-2 px-3 pr-5`,
        button: `bg-brown-p rounded-md
            w-full py-2 mt-2
            text-white text-center  
            hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
            focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p
            active:outline-none active:bg-zinc-300 active:ring-brown-p`,
        buttonSecondary: 
        `bg-white rounded-md 
        w-full py-2 mt-2
        text-brown-p text-center
        border-brown-p border-2 
        hover:bg-zinc-100 hover:ring-2 hover:ring-brown-p hover:border-zinc-100
            focus:bg-zinc-300 focus:ring-2 focus:ring-white focus:border-brown-p`,
    };

    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const loginMutation = useMutation(`${apiUrl}/auth/login`, true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setErrors([]);
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = await loginMutation.mutate(user);
            window.sessionStorage.setItem('token', token['token']);

            navigate(`/grupos`);
        } catch (error) {
            setErrors(error.message.split(','));
        }
    };

    return (
        <div className="p-10 font-fredoka flex flex-col items-center">
            <LogoDecoration width={240} />
            <form action="POST">
                <h1 className="text-brown-p-light text-center text-xl py-5">Iniciar sesión</h1>
                <div className="relative">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={style.input}
                        placeholder="Correo electrónico"
                        onChange={handleInputChange}
                        autoFocus
                        required
                    />
                    <img
                        src="../../src/assets/user.svg"
                        alt="icon"
                        className="absolute top-6 right-3"
                    />
                </div>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={style.input}
                        placeholder="Contraseña"
                        onChange={handleInputChange}
                        autoFocus
                        required
                    />
                    <img
                        src="../../src/assets/password.svg"
                        alt="icon"
                        className="absolute top-6 right-3"
                    />
                </div>

                {errors?.map((error, i) => (
                    <p key={i}>{error}</p>
                ))}
                <button type="submit" className={style.button} onClick={handleSubmit}>
                    Ingresar
                </button>
                <button
                    type="button"
                    className={style.buttonSecondary}
                    onClick={() => {
                        navigate(`/registro`);
                    }}
                >
                    Registrarme
                </button>
            </form>
        </div>
    );
}
