/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream:    { DEFAULT: '#F9F5F0', 50: '#FDFBF8', 100: '#F9F5F0', 200: '#F0E8DC', 300: '#E6D9C5' },
        blush:    { DEFAULT: '#E8B4B8', 50: '#FDF0F1', 100: '#F7D8DA', 200: '#E8B4B8', 300: '#D98A8F', 400: '#CA6068' },
        gold:     { DEFAULT: '#C9A96E', 50: '#F9F3E8', 100: '#F0E2C4', 200: '#DFC48E', 300: '#C9A96E', 400: '#A8833E', 500: '#8A6A2E' },
        lavender: { DEFAULT: '#C5B8D4', 50: '#F4F1F8', 100: '#E5DFEE', 200: '#C5B8D4', 300: '#A593BA', 400: '#8470A0' },
        charcoal: { DEFAULT: '#2C2C2C', 100: '#4A4A4A', 200: '#3A3A3A', 300: '#2C2C2C', 400: '#1A1A1A' },
        rose:     { DEFAULT: '#D4A5A5', 100: '#F5E5E5', 200: '#E8C4C4', 300: '#D4A5A5', 400: '#B87878' },
        sage:     { DEFAULT: '#B5C5B5', 100: '#EBF0EB', 200: '#C9D6C9', 300: '#B5C5B5' },
      },
      fontFamily: {
        serif:  ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans:   ['Jost', 'Inter', 'system-ui', 'sans-serif'],
        accent: ['Dancing Script', 'cursive'],
      },
      boxShadow: {
        luxury: '0 4px 40px rgba(0,0,0,0.08)',
        card:   '0 2px 20px rgba(0,0,0,0.06)',
        hover:  '0 8px 50px rgba(0,0,0,0.12)',
        gold:   '0 4px 20px rgba(201,169,110,0.35)',
      },
      animation: {
        'fade-up':   'fadeUp 0.7s ease-out forwards',
        'fade-in':   'fadeIn 0.5s ease-out forwards',
        'shimmer':   'shimmer 1.8s infinite linear',
        'float':     'float 4s ease-in-out infinite',
        'scale-in':  'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        shimmer:  { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        scaleIn:  { '0%': { opacity: 0, transform: 'scale(0.92)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #F9F5F0 0%, #F7EEE6 50%, #F0E8DC 100%)',
        'gradient-gold':   'linear-gradient(135deg, #DFC48E 0%, #C9A96E 50%, #A8833E 100%)',
        'gradient-hero':   'linear-gradient(180deg, rgba(44,44,44,0.55) 0%, rgba(44,44,44,0.2) 100%)',
        'shimmer-bg':      'linear-gradient(90deg, #f0e8dc 25%, #f9f5f0 50%, #f0e8dc 75%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
