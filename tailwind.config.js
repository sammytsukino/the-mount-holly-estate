/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueprint: {
          dark: '#1e3a5f',
          DEFAULT: '#2d5a8c',
          light: '#4a7bb7',
        },
      },
      fontFamily: {
        blueprint: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
