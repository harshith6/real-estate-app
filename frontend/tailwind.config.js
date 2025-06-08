/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        }
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.7s ease-in',
        'slide-up': 'slide-up 0.7s ease-out',
        'slide-down': 'slide-down 0.7s ease-out',
        'zoom-in': 'zoom-in 0.7s ease-out',
        'bounce-subtle': 'bounce-subtle 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}

