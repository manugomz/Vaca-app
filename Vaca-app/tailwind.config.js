/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //!yellow,white and pink mising
      colors:{
        'brown-p': '#36190D',
        'brown-p-light':'#b3715b',
        'green-p':'#6eab63',
        // 'blue-p':'#4f80a4',
        // 'purple-p':'#a65293',
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
  plugins: [],
}

