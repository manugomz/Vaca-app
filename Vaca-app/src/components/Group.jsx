import React from 'react'
import Logo from './Logo'
import { useEffect,useState } from 'react';

//TODO: Link redirecting "http://localhost:5173/Grupos#/Grupos"

const Group = () => {

    const styles={
        button:'bg-cafe text-white px-3 py-1 rounded-md shadow-sombra text-xs',
        img:'bg-blue-500 size-[4.5em] rounded-md flex justify-center items-center',
    }

    const [groups,setgroups]= useState([]);

    useEffect(()=>{
      const groups = fetch('http://localhost:3000/groups');
      groups.then(
        (res)=>res.json().then(data=>{
          console.info('response',data);
          setgroups(data);
        }),(err=>{
          console.info('request error',err)
        })
      )
    },[])

    console.log('groups',groups)

    const valor="45.000";
  return (
    <div className='font-fredoka py-3 flex justify-around shadow-sombra my-2 rounded-md'>
      <div className={styles.img}>
        <Logo bg='transparent' h='50' w='55'/>
      </div>
      <div className='w-3/5 flex flex-col justify-between'>
        <p>Grupo #1</p>
        <p className='text-xs'>Debes: <strong className='text-rojo'> ${valor}</strong></p>
        <div className='flex gap-3 pt-2'>
        <button className={styles.button}>Editar</button>
        <button className={styles.button}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default Group
