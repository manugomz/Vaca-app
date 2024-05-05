import React from "react";
import { IoClose } from "react-icons/io5";

//TODO change message when send form and check radio buttons

export default function Modal({onClose}) {
  const errorMessage = "Error"; //TODO! Change to variable

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


  return (
    <div
      className="fixed left-0 top-0 
                    w-full h-full 
                    flex justify-center 
                    bg-[rgb(0,0,0,0.5)]
                    font-fredoka"
    >
      <form
        className=" flex flex-col 
      mx-4 mt-32 py-4 px-8 
      w-80 h-80
      bg-white rounded-md"
      >
        <button className="self-end" type="reset" onClick={()=>onClose()}>
          <IoClose />
        </button>
        <fieldset className="flex flex-col items-center">
          <label htmlFor="group-name" className="text-center text-brown-p">
            Nuevo Grupo
          </label>
          <input
            id="group-name"
            name="name"
            type="text"
            maxLength="30"
            className="w-2/3 my-2 border-slate-400 border-2 rounded-md"
            autoFocus
            required
          />
        </fieldset>
        <fieldset
          className="grid grid-cols-4 
        justify-items-center content-around 
        border-slate-400 border-2 rounded-md 
        p-2 h-1/2"
        >
          {colorOptionsObject.map((color) => {
            console.log(color['name'], color['hex'])
            const buttonProps=`h-12 w-12 cursor-pointer 
                              rounded-md border-slate-300
                              focus:ring-slate-400 focus:ring-2 border-2 
                              active:border-slate-600 active:ring-slate-600 `;
            return(<div key={color['name']+'pickerButon'}>
              <input
                className="hidden"
                type="radio"
                id={color['name']}
                value={color['name']}
                name="Color"
                defaultChecked
              />
              <label htmlFor={color}>
                <button
                  type="button"
                  style={{backgroundColor:color['hex']}}
                  className={buttonProps}
                ></button>
              </label>
            </div>);
          })}

        </fieldset>

        <button
          type="submit"
          className="text-white bg-brown-p rounded-md py-1 text-center mt-2"
        >
          Crear
        </button>
        <p className="text-red-p py-1">{errorMessage}</p>
      </form>
    </div>
  );
}
