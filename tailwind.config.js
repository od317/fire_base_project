/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors') 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors:{
        'bg1':'#252525',
        'c1':'#6930C3',
        'c2':'#1DB9C3',
        'c3':'#1DB9C3'
      },
      keyframes:{
        popOut:{
          '0%':{ transform:'scale(0%)'},
          '80%':{transform:'scale(110%)'},
          '100%':{transform:'scale(100%)'}
        }
      },
      animation:{
        'popOut': 'popOut 1s linear'
      }
    },
  },
  plugins: [],
}

