/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saudi: {
          50: '#f0f9f4',
          100: '#dbf0e4',
          200: '#bae2cd',
          300: '#8ccdae',
          400: '#58b28a',
          500: '#32966c',
          600: '#237955',
          700: '#1c6045',
          800: '#184d39',
          900: '#006C35',
          950: '#0a271c',
          deep: '#0b241e',
          darkest: '#071814'
        },
        gold: {
          50: '#fdfbf7',
          100: '#f9f5eb',
          200: '#f1e6cd',
          300: '#e6d3a8',
          400: '#d7bc7d',
          500: '#c5a869',
          600: '#b19154',
          700: '#8f7241',
          800: '#735b36',
          900: '#5e4b2f',
        },
        parchment: {
          50: '#fcfbf8',
          100: '#f7f4ed',
          200: '#eee8da',
          300: '#e3d8c3',
          400: '#d5c4a7',
          500: '#c6b08e',
        }
      },
      fontFamily: {
        tajawal: ['Tajawal', 'IBM Plex Sans Arabic', 'sans-serif'],
        ibm: ['IBM Plex Sans Arabic', 'Tajawal', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 50, 30, 0.12), 0 4px 10px -2px rgba(0, 50, 30, 0.06)',
        'card-hover': '0 20px 40px -10px rgba(0, 50, 30, 0.2), 0 8px 16px -4px rgba(0, 50, 30, 0.1)',
        'gold-glow': '0 0 25px rgba(197, 168, 105, 0.35)',
      }
    },
  },
  plugins: [],
}
