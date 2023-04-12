/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: { "100": '#172554', "50": '#193697' },
        secondary: { "100": '#15803d', "50": '#18AC4E' }
      },
      fontFamily: {
        body: ['Inter']
      }
    }
  },
  plugins: []
}
