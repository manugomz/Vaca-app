import React from "react";
import Logo from "../components/Logo";
import Group from "../components/Group";
import useFetch from "../hooks/useFetch";
import Modal from "../components/Modal";

//TODO!: Buttons hover and click animations
//TODO: Sort groups
//TODO: Responsive for WEB


const Groups = () => {
  const styles = {
    container:"font-fredoka p-4 flex flex-col",
    loadingRectangle: "bg-slate-400 rounded-md animate-pulse",
    loadingButton:' text-slate-400 px-3 py-1 shadow-sombra text-xs',

  };

  const { data, loading, error } = useFetch("http://localhost:3000/groups");

  const grups=data.sort();

  if (loading) {
    return (
      <main className={styles.container + " animate-pulse bg-slate-100"}>
        
        <button
          className="bg-cafe text-white 
        px-3 py-1 w-1/3
        rounded-md shadow-sombra text-sm
        md:w-[20%]
        self-end"
        >
          Nuevo grupo
        </button>
        <div>
        <div className={styles.loadingRectangle + " w-1/6 h-5 mt-1"}></div>
          <div className={styles.loadingRectangle + " w-1/5 h-5 mt-1"}></div>
        </div>
        <div className="flex justify-around shadow-sombra py-3 my-2 rounded-md">
          <div
            className={
              styles.loadingRectangle +
              " flex justify-center items-center size-[4.5em]"
            }
          >
            <Logo bg="transparent" h="50" w="55" />
          </div>
          <div className="flex flex-col justify-between w-3/5">
            <div className={styles.loadingRectangle + " w-1/2 h-[30%]"}></div>
            <div className={styles.loadingRectangle + " w-1/4 h-[20%] mt-1"}></div>
            <div className="flex pt-2 gap-3">
              <button
                className={
                  styles.loadingRectangle + styles.loadingButton
                }
              >
                Editar
              </button>
              <button
                className={
                  styles.loadingRectangle + styles.loadingButton
                }
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  } else if (error) {
    return (
      <div className="font-fredoka flex flex-col">
        <div className="text-3xl text-center pt-2">
          Oops! there was an error
        </div>
        <div className="text-slate-600 text-xs text-center pt-2 w-2/3 self-center">
          {error}
        </div>
      </div>
    );
  } else if (data) {
    return (
      <main className={styles.container}>
        <Modal/>
        <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="button"
          className="bg-cafe text-white 
          px-3 py-1 w-1/3
          rounded-md shadow-sombra text-sm
          self-end
          hover:bg-cafe-light
          focus:ring-2 focus:outline-none focus:ring-cafe-light
          dark:bg-cafe dark:hover:bg-cafe-light dark:focus:bg-cafe-light" //TODO!: EDIT THIS
        >
          Nuevo grupo
        </button>
        <div>
          <p className="">Debes</p>
          <p className="text-rojo text-xl">$45.000</p>
        </div>
        {data && data.map((group) => <Group group={group} key={group.name} />)}
      </main>
    );
  }
};

export default Groups;
