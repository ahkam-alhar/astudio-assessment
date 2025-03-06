/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1224px',
        xl: '1224px',
        '2xl': '1224px',
      },
      padding: {
        DEFAULT: '16px',
      },
      center: true,
    },
    fontFamily: {
      sans: ['Neutra Text', 'sans-serif'],
    },
    extend: {
      colors: {
        black: '#322625',
        grey: '#ebebeb',
        blue: '#c0e3e5',
        yellow: '#fdc936',
      },
    },
  },
  plugins: [],
};
