import React from 'react'
import Group from '../components/Group'

const Groups = () => {
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
      <Group/>
      <Group/>
      <Group/>
    </main>
  )
}

export default Groups
