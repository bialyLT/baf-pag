/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark']
  }
}
