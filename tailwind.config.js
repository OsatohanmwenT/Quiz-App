/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "background-blue": "rgba(245, 247, 251, 1)",
      "dark-blue": "rgba(41, 50, 100, 1)",
      "blue": "rgba(77, 91, 158, 1)",
      "selected-blue": "rgba(214, 219, 245, 1)",
      "border-blue": "rgba(219, 222, 240, 1)",
      "green": "rgba(148, 215, 162, 1)",
      "red": "rgba(248, 188, 188, 1)",
      "black": "rgba(28, 28, 28, 1)"
    },
    extend: {},
  },
  plugins: [],
}