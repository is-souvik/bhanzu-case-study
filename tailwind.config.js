/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bhanzu: {
          orange: '#E8532A',
          orangeLight: '#FF6B3D',
        },
        wa: {
          green: '#00A884',
          greenLight: '#25D1A2',
          bg: '#ECE5DD',
          header: '#1A2836',
          dark: '#0B141A',
          bubble: '#1F2C38',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
