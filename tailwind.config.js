// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Scans all React components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Deep blue for headers/buttons
        secondary: '#F3F4F6', // Light gray for backgrounds
        accent: '#10B981', // Green for success states
        error: '#EF4444', // Red for errors
        warning: '#F59E0B', // Yellow for warnings
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out', // Renamed for clarity
        scaleHover: 'scaleHover 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};