import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import LogoDecoration from '../assets/LogoDecoration.svg?react';
import useMutation from '../hooks/useMutation';

export default function Register() {
    const style = {
        input: `w-full my-4 rounded-md border-slate-400 border-2 py-2 px-3`,
        button: `w-full text-white bg-brown-p rounded-md py-2 text-center mt-2 `,
    };

    const [newUser, setNewUser] = useState();
    const [errorMessages, setErrorMessages] = useState([]);

    const createUserMutation = useMutation('http://localhost:3000/users/');

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
                <Navigate to="/grupos" replace />;
            }
        } catch (e) {
            setErrorMessages(e.message.split(','));
        }
    };

    return (
        <div className="p-10 font-fredoka flex flex-col items-center">
            <LogoDecoration width={240} />
            <form action="POST">
                <h1 className="text-brown-p-light text-center text-xl py-5">Registro</h1>
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
                <button type="submit" className={style.button} onClick={handleSubmit}>
                    Registrarme
                </button>
                <ul className="list-disc pl-5 pt-5">
                    {errorMessages?.map((error, index) => (
                        <li className="text-red-p" key={index}>
                            {error}
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}
