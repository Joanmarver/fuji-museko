/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        fuji: {
          black: '#080808',
          white: '#f5f4f0',
          offwhite: '#e8e7e2',
          gold: '#c8a96e',
          'gold-light': 'rgba(200,169,110,0.15)',
          gray: '#777777',
        },
      },
    },
  },
  plugins: [],
}

