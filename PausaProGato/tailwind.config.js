/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paw: {
          darkBg: "#1b1b1b",
          darkText: "#f3e5d0",
          darkCard: "#2a2a2a",
          darkAccent: "#fbbf24",
          darkAccentHover: "#f59e0b",
        },
      },
    },
  },
  plugins: [],
}
