/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#7C3AED', // purple
        'gradient-end': '#0EA5E9',   // cyan
      },
    },
  },
  plugins: [],
};