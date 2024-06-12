import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoDecoration from '../assets/LogoDecoration.svg?react';
import useMutation from '../hooks/useMutation';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Login() {
    const style = {
        input: `w-full my-4 rounded-md border-slate-400 border-2 py-2 px-3`,
        button: `w-full text-white bg-brown-p rounded-md py-2 text-center mt-2 `,
        buttonSecondary: `w-full text-brown-p border-brown-p border-2 rounded-md py-2 text-center mt-2 `,
    };

    const [errorMsg, setErrorMsg] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const loginMutation = useMutation(`${apiUrl}/auth/login`, true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setErrorMsg('');
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
            window.sessionStorage.setItem('user', user.email);
            navigate(`/grupos`);
        } catch (error) {
            console.log(typeof error, error);
            setErrorMsg(error.message);
        }
    };

    return (
        <div className="p-10 font-fredoka flex flex-col items-center">
            <LogoDecoration width={240} />
            <form action="POST">
                <h1 className="text-brown-p-light text-center text-xl py-5">Iniciar sesión</h1>
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
                <p className="text-red-p">{errorMsg}</p>
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
