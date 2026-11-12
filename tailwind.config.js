/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: 'var(--ocean)',
          deep: 'var(--ocean-deep)',
          raised: 'var(--ocean-raised)',
        },
        sea: 'var(--sea)',
        mint: 'var(--mint)',
        ember: 'var(--ember)',
        ivory: 'var(--ivory)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--ocean-deep)',
          foreground: 'var(--muted-foreground)',
        },
        glass: {
          DEFAULT: 'var(--glass)',
          strong: 'var(--glass-strong)',
          border: 'var(--glass-border)',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"General Sans"', 'Satoshi', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sea': 'var(--shadow-glow-sea)',
        'glow-ember': 'var(--shadow-glow-ember)',
      },
    },
  },
  plugins: [],
};

