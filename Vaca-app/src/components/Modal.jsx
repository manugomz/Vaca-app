import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import useMutation from "../hooks/useMutation";

//TODO change message when send form and check radio buttons

export default function Modal({ onClose, reFetch }) {
  const style = {
    colorsFieldset: `grid grid-cols-4 
    justify-items-center content-around 
    border-slate-400 border-2 rounded-md 
    p-2 h-1/2`,
    createButton: `text-white bg-brown-p rounded-md py-1 text-center mt-2`,
    modalBackground: `fixed left-0 top-0 
                    flex justify-center 
                    w-full h-full 
                    bg-[rgb(0,0,0,0.5)]
                    font-fredoka`,
    modal: `flex flex-col self-center
          mx-4 py-4 px-8 
          w-80 h-80
          bg-white rounded-md`,
    nameInput: `w-full my-2 rounded-md border-slate-400 border-2 p-1 px-3`,
    radioButton: `h-12 w-12 cursor-pointer 
                rounded-md border-slate-300 border-2
                focus:ring-slate-400 focus:ring-2  
                active:border-slate-600 active:ring-slate-600 `,
  };

  const colorOptionsObject = [
    { name: "purple", hex: "#a65293" },
    {
      name: "green",
      hex: "#6eab63",
    },
    {
      name: "brown",
      hex: "#9d5239",
    },
    {
      name: "blue",
      hex: "#5182a5",
    },
    {
      name: "white",
      hex: "#fff",
    },
    {
      name: "yellow",
      hex: "#ffa830",
    },
    {
      name: "pink",
      hex: "#fee3e2",
    },
    {
      name: "red",
      hex: "#ff131e",
    },
  ];

  const [errorMsg, setErrorMsg] = useState("ERROR");
  const [newGroup, setNewGroup] = useState({
    ownerUserId: 1,
    name: "",
    color: "#FFF",
  });
  const createGroupMutation = useMutation("http://localhost:3000/groups/");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewGroup({
      ...newGroup,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onClose();

    try {
      await createGroupMutation.mutate(newGroup);
      if (createGroupMutation.error) {
        setErrorMsg(createGroupMutation.error);
      }
      reFetch();
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  return (
    <div className={style.modalBackground}>
      <form className={style.modal} method="POST">
        <button className="self-end" type="reset" onClick={() => onClose()}>
          <IoClose />
        </button>

        <fieldset className="flex flex-col items-center">
          <label htmlFor="name" className="text-center text-brown-p">
            Nuevo Grupo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            maxLength="30"
            className={style.nameInput}
            value={newGroup.name}
            onChange={handleInputChange}
            autoFocus
            required
          />
        </fieldset>

        <fieldset className={style.colorsFieldset}>
          {colorOptionsObject.map((color) => {
            return (
              <div key={color["name"] + " pickButon"}>
                <button
                  type="button"
                  style={{ backgroundColor: color["hex"] }}
                  className={style.radioButton}
                  onClick={() => {
                    setNewGroup({
                      ...newGroup,
                      ["color"]: color["hex"],
                    });
                  }}
                ></button>
              </div>
            );
          })}
        </fieldset>

        <button
          type="submit"
          className={style.createButton}
          onClick={handleSubmit}
        >
          Crear
        </button>
        <p className="text-red-p py-1">{errorMsg}</p>
      </form>
    </div>
  );
}
