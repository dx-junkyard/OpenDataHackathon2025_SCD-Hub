import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './_components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7dd3fc'
      }
    }
  },
  plugins: []
} satisfies Config;
