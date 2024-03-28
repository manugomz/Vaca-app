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
      },
      // fontFamily:{
      //   'fredoka':['Fredoka','sans-serif'],
      // }
    },
  },
  plugins: [],
}

