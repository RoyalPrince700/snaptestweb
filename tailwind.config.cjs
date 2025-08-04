// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        snaptest: ['Unbounded', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1A73E8',
          dark:    '#1558B0',
        },
        accent:   '#F4A261',
        neutral: {
          light: '#F5F7FA',
          DEFAULT: '#E2E8F0',
          dark:  '#334155',
        },
      },
    },
  },
  plugins: [],
}
