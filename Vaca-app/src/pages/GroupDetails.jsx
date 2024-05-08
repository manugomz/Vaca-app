import React from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

import SingleGroup from "../components/SingleGroup";

export default function GroupDetails() {
  const styles = {
    button: `bg-brown-p rounded-md px-3 py-1
    shadow-sombra
    text-white text-xs 
    hover:bg-zinc-300 
    focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p`,
  };

  const { id } = useParams();

  const {
    data: singleGroup,
    loading,
    error,
  } = useFetch("http://localhost:3000/groups/" + id);

  const group = {
    total: 2000,
    members: ["Migue", "Cesar", "Lili"],
    element: "Cafe en Cali",
  };

  return (
    <main className="font-fredoka px-4">
      <section className="flex justify-around pt-5 py">
        <button className={styles.button}>Nuevo Gasto</button>
        <button className={styles.button}>Nuevo Amigo</button>
        <button className={styles.button}>Editar Grupo</button>
      </section>

      <SingleGroup group={singleGroup}>
        <p>{singleGroup.name}</p>
        {group.total > 0 ? (
          <p className="text-xs">
            Te deben: <strong className="text-green-p">{group.total}</strong>
          </p>
        ) : (
          <p className="text-xs">
            Debes: <strong className="text-red-p">{group.total}</strong>
          </p>
        )}
        <button className={styles.button + " self-start mt-1"}>
          Salir del grupo
        </button>
      </SingleGroup>

      <h2 className=" text-amber-400 text-lg">GASTOS</h2>
      <section>
        <h3>Enero 2024</h3>
        <SingleGroup group={singleGroup}>
          <p className="text-sm text-zinc-700">
            <span className="text-amber-400">Juan Guillermo</span> pagó $
            {group.total} por `{group.element}`
          </p>
          <p className="text-sm">No participé</p>
          <div className="flex gap-3 pt-1">
            <button className={styles.button}>Editar</button>
            <button className={styles.button}>Eliminar</button>
          </div>
        </SingleGroup>
      </section>
    </main>
  );
}
