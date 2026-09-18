/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        vault: {
          blue: "#4F5FE0",
          "blue-dark": "#3E4CC7",
          navy: "#1B2340",
          bg: "#F4F6FC",
        },
      },
      fontFamily: {
        serif: ["'Lora'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
