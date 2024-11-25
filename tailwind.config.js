/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#121212',
          800: '#1E1E1E',
          700: '#2D2D2D',
          600: '#383838',
        },
        accent: {
          purple: '#8B5CF6',
          'purple-dark': '#7C3AED',
          'purple-light': '#A78BFA',
        },
        topic: {
          green: '#48ab5c',
          orange: '#fab465',
          purple: '#8d77b5',
          mint: '#97c99f',
          blue: '#5c9dff',
          red: '#ff7676',
          yellow: '#ffd76b',
          teal: '#4fd1c5',
          pink: '#ed64a6',
          indigo: '#667eea',
        }
      }
    },
  },
  plugins: [],
};