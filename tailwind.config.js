/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '*.html',
    // '**/*.html',
    'assets/js/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'Arial', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      // Add more custom font families as needed
    },
    extend: {
      colors: {
        primary: '#66869B',
        secondary: '#B7B7B7',
        tertiary: '#707070',
      },
    },
  },
  plugins: [],
}

