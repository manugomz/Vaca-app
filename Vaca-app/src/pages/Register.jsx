import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import LogoDecoration from '../assets/LogoDecoration.svg?react';
import useMutation from '../hooks/useMutation';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Register() {
    const style = {
        input: `w-full my-4 rounded-md border-slate-400 border-2 py-2 px-3`,
        button: `bg-brown-p rounded-md 
                py-2 mt-2 
                shadow-sombra 
                text-white  text-center 
                hover:bg-yellow-800 hover:ring-2 hover:ring-brown-p
                focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p
                active:outline-none active:bg-zinc-300 active:ring-brown-p`,
    };

    const [newUser, setNewUser] = useState();
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    const createUserMutation = useMutation(`${apiUrl}/users/`);
    const loginMutation = useMutation(`${apiUrl}/auth/login`, true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
        setErrorMessages(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await createUserMutation.mutate(newUser);

            if (createUserMutation.error) {
                setErrorMessages(createUserMutation.error);
            } else {
                const info = await loginMutation.mutate(newUser);
                window.sessionStorage.setItem('token', info['token']);
                window.sessionStorage.setItem('user', JSON.stringify(info['user']));
                navigate(`/`);
            }
        } catch (e) {
            setErrorMessages(e.message.split(','));
        }
    };

    return (
        <div
            className="flex flex-col 
        items-center
        w-full
        font-fredoka  
        lg:flex-row"
        >
            <div
                className="flex flex-col 
                            items-center justify-center 
                            pt-10
                            lg:pt-0 lg:w-[50vw]"
            >
                <LogoDecoration width={240} />
                <p
                    className="hidden 
                            mt-5
                            text-brown-p text-3xl
                            lg:inline"
                >
                    Si ya tienes una cuenta
                </p>
                <p
                    className="hidden 
                    mt-2
                            text-brown-p text-xl
                            lg:inline"
                >
                    Haz click en el botón para iniciar sesión
                </p>
                <button
                    type="button"
                    className={style.button + ' w-1/3 mt-16 hidden lg:inline'}
                    onClick={() => {
                        navigate(`/login`);
                    }}
                >
                    Iniciar sesión
                </button>
            </div>
            <form
                action="POST"
                className="flex flex-col justify-center
                w-1/2
                lg:bg-brown-p lg:h-[100vh] lg:w-1/2"
            >
                <h1
                    className="py-5
                        text-brown-p-light text-center text-xl  
                        lg:text-white lg:text-3xl"
                >
                    Registro
                </h1>

                <div className="w-full self-center flex flex-col lg:w-1/2">
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            maxLength="30"
                            className={style.input}
                            placeholder="Nombre"
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

                    <button
                        type="submit"
                        className={
                            style.button +
                            '  w-full self-center lg:w-3/4 lg:bg-brown-p-light lg:mt-10'
                        }
                        onClick={handleSubmit}
                    >
                        Registrarme
                    </button>

                    <ul className="list-disc pl-5 pt-5">
                        {errorMessages?.map((error, index) => (
                            <li className="text-red-p" key={index}>
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    );
}
