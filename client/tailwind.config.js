/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}", // path to vechaiui
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@vechaiui/core"),
  ],
}

// // tailwind.config.js
// module.exports = {
//   mode: "jit",
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   purge: [
//     // ...
//     "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}", // path to vechaiui
//   ],
//   darkMode: "class", // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [
//     require("@tailwindcss/forms"),
//     require("@vechaiui/core"),
//   ],
// };