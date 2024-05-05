import React from "react";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SingleGroup from "../components/SingleGroup";
import Logo from "../components/Logo";
import Modal from "../components/Modal";

//TODO!: Buttons hover and click animations
//TODO: Sort groups
//TODO: Responsive for WEB

const Groups = () => {
  const styles = {
    container: "font-fredoka p-4 flex flex-col",
    loadingRectangle: "bg-zinc-400 rounded-md animate-pulse",
    loadingButton: " text-zinc-400 px-3 py-1 shadow-sombra text-xs",
    button: `bg-brown-p text-white
    px-3 py-1
    shadow-sombra rounded-md 
    text-xs 
    hover:bg-brown-p-light
    focus:bg-zinc-300 focus:ring-2 focus:ring-brown-p focus:text-brown-p
    active:outline-none active:ring-brown-p`,
  };

  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const {
    data: groups,
    loading,
    error,
  } = useFetch("http://localhost:3000/groups/");

  if (loading) {
    return (
      <main className={styles.container + " animate-pulse bg-zinc-100"}>
        <button
          className="bg-brown-p text-white 
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
            <div
              className={styles.loadingRectangle + " w-1/4 h-[20%] mt-1"}
            ></div>
            <div className="flex pt-2 gap-3">
              <button
                className={styles.loadingRectangle + styles.loadingButton}
              >
                Editar
              </button>
              <button
                className={styles.loadingRectangle + styles.loadingButton}
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
        <div className="text-zinc-600 text-xs text-center pt-2 w-2/3 self-center">
          {error}
        </div>
      </div>
    );
  } else if (groups) {
    return (
      <main className={styles.container}>
        {modalOpen && (
          <Modal
            onClose={() => {
              setModalOpen(false);
            }}
          />
        )}
        <button
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          type="button"
          className= {styles.button +" w-1/3 text-sm self-end"}
          onClick={() => setModalOpen(true)}
        >
          Nuevo grupo
        </button>
        <div>
          <p className="">Debes</p>
          <p className="text-rojo text-xl">$45.000</p>
        </div>
        {groups &&
          groups.map((group) => {
            return (
              <SingleGroup
                group={group}
                key={group.name}
                loading={loading}
                error={error}
              >
                <p>{group.name}</p>
                {group.total > 0 ? (
                  <p className="text-xs">
                    Te deben:{" "}
                    <strong className="text-green-p">{group.total}</strong>
                  </p>
                ) : (
                  <p className="text-xs">
                    Debes: <strong className="text-red-p">{group.total}</strong>
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    className={styles.button}
                    onClick={() => {
                      navigate("/grupos/detalle-de-grupo/");
                    }}
                  >
                    Editar
                  </button>

                  <button className={styles.button}>Eliminar</button>
                </div>
              </SingleGroup>
            );
          })}
      </main>
    );
  }
};

export default Groups;
