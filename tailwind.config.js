const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Poppins', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        blue: colors.sky,
        green: colors.lime,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
