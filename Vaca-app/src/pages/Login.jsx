import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const style = {
    input: `w-full my-4 rounded-md border-slate-400 border-2 py-2 px-3`,
    button: `w-full text-white bg-brown-p rounded-md py-2 text-center mt-2 `,
    buttonSecondary: `w-full text-brown-p border-brown-p border-2 rounded-md py-2 text-center mt-2 `,
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //TODO: Redirect
    console.log(user)
  };

  return (
    <div className="p-10 font-fredoka flex flex-col items-center">
      <img src="../src/assets/LogoDecoration.svg" width="240" />
      <form action="POST">
        <h1 className="text-brown-p-light text-center text-xl py-5">
          Iniciar sesión
        </h1>
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
        <p className="text-red-p">{errorMsg}</p>
        <button type="submit" className={style.button} onClick={handleSubmit}>
          Ingresar
        </button>
        <button
          type="button"
          className={style.buttonSecondary}
          onClick={() => {
            navigate(`/registro`);
          }}
        >
          Registrarme
        </button>
      </form>
    </div>
  );
}
