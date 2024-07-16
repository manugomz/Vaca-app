import React from 'react';
import CustomButton from '../components/CustomButton';

const UserInformation = () => {


    const user = JSON.parse(window.sessionStorage.user);
    return (
        <main className="p-5 pb-10 font-fredoka flex flex-col h-[calc(100vh-131px)] justify-between">
            <h3 className="text-center text-2xl md:text-4xl">Mi perfil</h3>
            <div className="flex flex-col items-center md:flex-row justify-center">
                <img
                    src="../src/assets/userFilled.svg"
                    alt="user image"
                    className=" h-24 aspect-square rounded-full border-2 p-3 border-zinc-600 mb-5"
                />
                <div className="grid grid-cols-3 px-5">
                    <p>Nombre: </p>
                    <p className="col-span-2"> {user.name}</p>
                    <p>Correo: </p>
                    <p className="col-span-2">{user.email}</p>
                </div>
            </div>
            <CustomButton otherStyles="mt-4 w-44 self-center">Editar información</CustomButton>
            <div className="flex flex-col w-full items-center self-end">
                <CustomButton otherStyles="w-40">Log out</CustomButton>
                <CustomButton variant="secondary" otherStyles="w-40 mt-5">
                    Delete account
                </CustomButton>
            </div>
        </main>
    );
};

export default UserInformation;
