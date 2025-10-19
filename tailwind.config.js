/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Blue primary palette
        primary: {
          50: '#e6f1ff',
          100: '#b3d7ff',
          200: '#80bdff',
          300: '#4da3ff',
          400: '#1a89ff',
          500: '#0B60FF', // Main brand blue
          600: '#0950d9',
          700: '#0740b3',
          800: '#05308c',
          900: '#032066',
        },
        // Dark mode backgrounds
        dark: {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          750: '#1a202c',
          800: '#0f1419',
          900: '#0a0e13',
        },
      },
      backgroundColor: {
        'dark-card': '#1a202c',
        'dark-hover': '#2d3748',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-blue': 'linear-gradient(135deg, #0B60FF 0%, #0950d9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0e13 0%, #05070a 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(11, 96, 255, 0.3)',
        'glow-md': '0 0 25px rgba(11, 96, 255, 0.4)',
        'glow-lg': '0 0 35px rgba(11, 96, 255, 0.5)',
        'dark-lg': '0 10px 40px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
