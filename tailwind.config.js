export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          surface: '#FCFAF8',
          primary: '#C18C7A',
          primaryDark: '#9C6C5C',
          ink: '#2C2724',
          muted: '#8A827E'
        }
      },
      fontFamily: {
        sans: ['"Outfit"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}