/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '620px',
      },
      colors: {
        black: '2C2C2C',
      },
      fontFamily: {
        logo: 'var(--font-kohSantepheap)',
        lexend: 'var(--font-lexend)',
      },
    },
  },
  plugins: [],
};
