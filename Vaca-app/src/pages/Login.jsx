import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoDecoration from '../assets/LogoDecoration.svg?react';
import useMutation from '../hooks/useMutation';
import CustomButton from '../components/CustomButton';

//! MISSING CUSTOM BUTTON ON LOGIN; REGISTER AND USERINFORMATION PAGES

const apiUrl = import.meta.env.VITE_API_URL;

export default function Login() {
    const style = {
        input: `rounded-md border-2 border-slate-400
                py-2 pl-3 pr-10 my-4
                w-full`,
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
            const info = await loginMutation.mutate(user);
            window.sessionStorage.setItem('token', info['token']);
            window.sessionStorage.setItem('user', JSON.stringify(info['user']));
            navigate(`/`);
        } catch (error) {
            setErrors(error.message.split(','));
        }
    };

    return (
        <div className="font-fredoka flex flex-col items-center lg:flex-row">
            <div className="pt-10 lg:pt-0 lg:w-1/2 flex flex-col items-center justify-center">
                <LogoDecoration width={240} />
                <p
                    className="hidden 
                            mt-5
                            text-brown-p text-3xl
                            lg:inline"
                >
                    ¿Todavía no tienes una cuenta?
                </p>
                <p
                    className="hidden 
                    mt-2
                            text-brown-p text-xl
                            lg:inline"
                >
                    Regístrate para crear una vaca con tus amigos
                </p>
                <CustomButton
                    onClickFunction={() => {
                        navigate(`/registro`);
                    }}
                    otherStyles=" w-1/3 mt-16 hidden lg:inline"
                >
                    Registro
                </CustomButton>
            </div>
            <form
                action="POST"
                className="flex flex-col justify-center
                w-1/2
                lg:bg-brown-p lg:h-[100vh] lg:w-1/2"
            >
                <h1
                    className="text-brown-p-light text-center text-xl py-5
                            lg:text-white lg:text-3xl"
                >
                    Iniciar sesión
                </h1>
                <div className="w-full lg:w-1/2 self-center">
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
                </div>

                {errors?.map((error, i) => (
                    <p className="text-center md:pt-5 lg:text-white" key={i}>
                        {error}
                    </p>
                ))}
                <CustomButton
                    type="submit"
                    onClickFunction={handleSubmit}
                    otherStyles="w-full self-center lg:w-1/3 lg:bg-brown-p-light mt-8 "
                >
                    Ingresar
                </CustomButton>
                <CustomButton
                    variant="secondary"
                    otherStyles="lg:hidden mt-3"
                    onClickFunction={() => {
                        navigate(`/registro`);
                    }}
                >
                    Registrarme
                </CustomButton>
            </form>
        </div>
    );
}
