/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {},
  },
  darkMode: "selector",
  plugins: [require("@tailwindcss/forms")],
};
