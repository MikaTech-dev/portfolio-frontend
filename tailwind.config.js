/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'royal-purple': '#c084fc',
        'electric-violet': '#8C3BFF',
        'neon-fuchsia-glow': '#C94EFF',
        'deep-midnight': '#1C102E',
        'metallic-slate': '#2F2B3A',
        'frosted-silver': '#E3E0FF',
      },
    },
  },
  plugins: [],
};
