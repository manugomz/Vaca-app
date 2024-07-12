import React from 'react';
import useFetch from '../../hooks/useFetch';
import { IoClose } from 'react-icons/io5';

import CustomButton from '../CustomButton';

//TODO change message when send form and check radio buttons

export default function AddFriendToGroup({ onClose, groupId }) {
    const style = {
        modalBackground: `fixed left-0 top-0 
                    flex justify-center 
                    w-full h-full 
                    bg-[rgb(0,0,0,0.5)]
                    font-fredoka`,
        modal: `flex flex-col self-center
                p-4 px-8 gap-3
                h-[350px] w-80
                bg-white rounded-md
                text-center 
                md:text-lg md:w-92`,
    };

    const {
        data: usersAvailableForGroup,
        loading: loadingUsersGroup,
        error: errorUsersGroup,
        reFetch: reFetchUsersGroup,
    } = useFetch('http://localhost:3000/usersgroup/usersavailable/' + groupId);

    return (
        <div className={style.modalBackground}>
            <dialog autoFocus className={style.modal}>
                <button className="self-end" type="reset" onClick={() => onClose()}>
                    <IoClose />
                </button>
                <p>¿a quiénes quieres agregar?</p>
                <form className="flex flex-col h-full justify-between">
                    <ul
                        className="shadow-sombra h-[180px]
                        p-3 my-3 rounded-md overflow-y-scroll"
                    >
                        {usersAvailableForGroup &&
                            usersAvailableForGroup?.map((user) => {
                                return (
                                    <li className="flex gap-2">
                                        <input type="checkbox" name="email" id={user.userid} />
                                        <p>{user.email}</p>
                                    </li>
                                );
                            })}
                    </ul>

                    <CustomButton
                        type="submit"
                        
                        otherStyles=" w-full"
                        onClickFunction={() => {
                            onAdd(id);
                            onClose(true);
                        }}
                    >Agregar</CustomButton>
                </form>
            </dialog>
        </div>
    );
}
