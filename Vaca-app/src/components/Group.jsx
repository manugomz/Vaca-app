import React from "react";
import Logo from "./Logo";
import useFetch from "../hooks/useFetch";

//TODO: Link redirecting "http://localhost:5173/Grupos#/Grupos"

const Group = ({ group }) => {
  const { data, loading, error } = useFetch(
    `http://localhost:3000/groups/${group.name}`
  );

  const styles = {
    button: "bg-cafe text-white px-3 py-1 rounded-md shadow-sombra text-xs",
    img: "bg-blue-500 size-[4.5em] rounded-md flex justify-center items-center",
  };

  if (loading) {
    return (<div className="font-fredoka py-3 flex justify-around shadow-sombra my-2 rounded-md">
    <div className="bg-slate-500 size-[4.5em] rounded-md flex justify-center items-center">
      <Logo bg="transparent" h="50" w="55" />
    </div>
    <div className="w-3/5 flex flex-col justify-between">
      <div className='bg-slate-400 animate-pulse w-1/2 h-[30%] rounded-md'></div>
      <div className='bg-slate-400 animate-pulse w-1/4 h-[20%] rounded-md mt-1'></div>
      <div className="flex gap-3 pt-2">
        <button className="bg-slate-400 text-white px-3 py-1 rounded-md shadow-sombra text-xs">Editar</button>
        <button className="bg-slate-400 text-white px-3 py-1 rounded-md shadow-sombra text-xs">Eliminar</button>
      </div>
    </div>
  </div>);
  } else if (data) {
    return (
      <div className="font-fredoka py-3 flex justify-around shadow-sombra my-2 rounded-md">
        <div className={styles.img}>
          <Logo bg="transparent" h="50" w="55" />
        </div>
        <div className="w-3/5 flex flex-col justify-between">
          <p>{data.name}</p>
          {data.amount > 0 ? (
            <p className="text-xs">
              Te deben: <strong className="text-verde">{data.amount}</strong>
            </p>
          ) : (
            <p className="text-xs">
              Debes: <strong className="text-rojo">{Math.abs(data.amount)}</strong>
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button className={styles.button}>Editar</button>
            <button className={styles.button}>Eliminar</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Group;
