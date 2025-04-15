/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: 'class', // Soporte para modo oscuro con clase
    theme: {
      extend: {
        colors: {
          primary: '#0ea5e9',   // Azul claro
          accent: '#f59e0b',    // Naranja cálido
          base: '#111827',      // Fondo oscuro
        },
        fontSize: {
          '2xs': '0.625rem',
          '3xl': '1.875rem',
        },
        boxShadow: {
          soft: '0 2px 10px rgba(0,0,0,0.15)',
          strong: '0 4px 20px rgba(0,0,0,0.35)',
        },
        borderRadius: {
          '2xl': '1rem',
          '3xl': '1.5rem',
        }
      },
    },
    plugins: [],
  }
  