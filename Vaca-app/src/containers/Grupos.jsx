import React from 'react';
import Logo from "../components/Logo";
import Group from '../components/Group';
import useFetch from '../hooks/useFetch';

const Groups = () => {

  const { data, loading, error } = useFetch("http://localhost:3000/groups");

  if (loading) {
    return (
      <main className='font-fredoka p-4 flex flex-col animate-pulse bg-slate-100'>
      <button className='bg-cafe text-white 
        px-3 py-1 w-1/3
        rounded-md shadow-sombra text-sm
        md:w-[20%]
        self-end'>Nuevo grupo</button>
      <div>
        <p className=''>Total</p>
        <p className='text-slate-500 text-xl'>$0</p>
      </div>
      <div className="font-fredoka py-3 flex justify-around shadow-sombra my-2 rounded-md">
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
      </div>
    </main>
      
    );
  } else if (error) {
    return (
      <div className="flex flex-col font-fredoka">
        <div className="text-3xl pt-2 text-center">
          Oops! there was an error
        </div>
        <div className="text-xs pt-2 text-center w-2/3 self-center text-gray-800">
          {error}
        </div>
      </div>
    );
  } else if (data) {
    return (
      <main className='font-fredoka p-4 flex flex-col'>
        <button className='bg-cafe text-white 
          px-3 py-1 w-1/3
          rounded-md shadow-sombra text-sm
          self-end'>Nuevo grupo</button>
        <div>
          <p className=''>Debes</p>
          <p className='text-rojo text-xl'>$45.000</p>
        </div>
        {data && (data.map((group)=><Group group={group} key={group}/>))}
      </main>
    )
  }

  
}

export default Groups
