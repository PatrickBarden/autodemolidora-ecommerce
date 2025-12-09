/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C12322',
        primaryDark: '#A31C1B',
        blackCarbon: '#1A1A1C',
        grayDark: '#2C2F33',
        grayMedium: '#3B3E43',
        grayLight: '#B5B5B5',
        success: '#4CAF50',
        warning: '#F0C243',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Anton', 'sans-serif'],
        subheading: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
