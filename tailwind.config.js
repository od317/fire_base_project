/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors') 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors:{
        'bg1':'#5356FF',
        'c1':'#378CE7',
        'c2':'#67C6E3',
        'c3':'#DFF5FF'
      }
    },
  },
  plugins: [],
}

