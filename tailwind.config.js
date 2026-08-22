/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#070a12',
          900: '#0b0f1a',
          850: '#0e131f',
          800: '#131826',
          700: '#1a2030',
          600: '#232a3d',
          500: '#2e364c',
          400: '#3d4660',
        },
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        emerald2: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
      },
      boxShadow: {
        'glow-brand': '0 0 0 1px rgba(34,211,238,0.18), 0 8px 40px -8px rgba(34,211,238,0.35)',
        'glow-emerald': '0 0 0 1px rgba(16,185,129,0.18), 0 8px 40px -8px rgba(16,185,129,0.35)',
        'card': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 1px 24px -10px rgba(0,0,0,0.6)',
        'card-hover': '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 12px 40px -12px rgba(0,0,0,0.7)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.16,1,0.3,1) both',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.4,0,0.2,1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
