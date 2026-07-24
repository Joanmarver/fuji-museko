/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        terra: '#C4522A',
        'terra-dark': '#a8431f',
      },
    },
  },
  plugins: [],
}