import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './_components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0369a1'
      }
    }
  },
  plugins: []
} satisfies Config;
