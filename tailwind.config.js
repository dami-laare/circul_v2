/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        // laptop: '1024px',
        // desktop: '1280px',
      },
      fontFamily: {
        Alef: ['Alef', 'sans-serif'],
        Sans: ['DM Sans', 'sans-serif'],
        Museo: ['MuseoModerno', 'cursive'],
      },
      colors: {
        primary: {
          1: '#FF6764',
        },
        secondary: {
          1: '#000000',
          2: '#828282',
          3: '#C4C4C4',
        },
        link: {
          1: '#164594',
        },
        success: {
          1: '#34A853',
        },
      },
      fontSize: {
        h1: '50.2px',
        h2: '41.8px',
        h3: '34.84px',
        h4: '29.03px',
        h5: '24.19px',
        h6: '20.16px',
        lg: '16.8px',
        base: '14px',
        sm: '11.67px',
      },
    },
  },
  plugins: [],
};
