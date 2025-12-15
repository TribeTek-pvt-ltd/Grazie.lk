/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#e5e7eb",
        soft: "#f9fafb",
        accent: "#9ca3af",
        dark: "#374151",
        gold: "#d1a054"
      }
    }
  },
  plugins: [],
}
