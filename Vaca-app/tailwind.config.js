/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'cafe': '#36190D',
        'cafe-light':'#725e55',
        'verde':'#6eab63',
        'azul':'#4f80a4',
        'morado':'#a65293',
        'rojo':'#ff131e',
      },
      fontFamily:{
      fredoka:'Fredoka',
      },
      boxShadow:{
        'sombra': '0px 3px 5px 1px rgba(0,0,0,0.2)',
      }
    },
  },
  plugins: [],
}

