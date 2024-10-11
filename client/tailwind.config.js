/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--tl-background)',
        foreground: 'var(--tl-foreground)',

        primary: {
          DEFAULT: 'var(--tl-primary)',
          shade: 'var(--tl-primary-shade)',
          tint: 'var(--tl-primary-tint)',
          contrast: 'var(--tl-primary-contrast)'
        },

        ring: 'var(--tl-ring)'
      },
      borderRadius: {
        lg: 'var(--tl-border-radius)',
        md: 'calc(var(--tl-border-radius) - 2px)',
        sm: 'calc(var(--tl-border-radius) - 4px)'
      }
    }
  },
  plugins: []
}
