/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        platinum: {
          900: "#fafafa",
          700: "#f0f0f0",
        },
        oxford_blue: {
          500: "#14213d",
          400: "#101b31",
        },
        black: {
          600: "#333333",
        },
        white: {
          500: "#ffffff",
        },
        orange_web: {
          500: "#fca311",
          600: "#fdb541",
        },
        alert: {
          500: "#ffd60a",
        },
      },
    },
  },
  plugins: [],
}