/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        wave1: 'wave 14s infinite linear',
        wave2: 'wave 10s infinite linear',
        wave3: 'wave 12s infinite linear',
      },
      keyframes:{ 
        wave:{
          '0%':{ 'transform':'translateX(0%)'},
          '100%': { 'transform':'translateX(-59.5%)'},
        },
    },
      colors:{
        'brown-p': '#36190D',
        'brown-p-light':'#b3715b',
        'green-p':'#6eab63',
        'red-p':'#ff131e',
      },
      fontFamily:{
      fredoka:'Fredoka',
      },
      boxShadow:{
        'sombra': '0px 3px 5px 1px rgba(0,0,0,0.2)',
      }
    },
  },
}

