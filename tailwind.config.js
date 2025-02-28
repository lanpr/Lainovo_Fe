/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        Mandali: '"Mandali", sans-serif',
        Confortaa: '"Comfortaa", sans-serif',
        pacifico: '"Pacifico", Roboto',
      },
      colors: {
        white50: "#F1F8F5",
        white100: "#DCEFE5",
        wrapper200: "#BCDECE",
        background400: "#8FC6AF",
        green400: "#60A78C",
        green500: "#3F8A70",
        green600: "#2D6E59",
        green700: "#245848",
        green800: "#1F463B",
        green900: "#1A3A32",
        green950: "#0E201C",
        blue300: "#4e7cf2"
      }
    },

  },
  plugins: [],
}
