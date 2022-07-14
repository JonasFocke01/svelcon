module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    colors: {
      primary: '#0044ae',
      secondary: '#02adff',
      accent: '#ff8c00',
      success: '#4dea3f',
      warning: '#f4bb50',
      error: '#f74838',
      info: '#62acfc',
      surface: '#006bc6',
      text: '#ffffff',
      black: '#000000'
    },
    extend: {
      fontFamily: {
        robotoslab: ['Roboto Slab', 'serif-serif'],
        kouhlen: ['Koulen', 'serif-serif'],
        lato: ['Lato', 'sans-serif']
      }
    }
  },
  plugins: []
};
