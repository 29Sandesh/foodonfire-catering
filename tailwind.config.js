/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#fef9ef",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f8f3e9",
        "surface-container": "#f2ede3",
        "surface-container-high": "#ede8de",
        "surface-container-highest": "#e7e2d8",
        "surface-dim": "#dedad0",
        "surface-bright": "#fef9ef",
        "surface-variant": "#e7e2d8",
        "on-surface": "#1d1c16",
        "on-surface-variant": "#4d453d",
        "primary": "#6f5b41",
        "primary-container": "#a58d70",
        "on-primary": "#ffffff",
        "on-primary-container": "#372711",
        "secondary": "#5f5e5e",
        "secondary-container": "#e2dfde",
        "on-secondary": "#ffffff",
        "tertiary": "#625e57",
        "outline": "#7f756c",
        "outline-variant": "#d0c4b9",
        "bronze": "#a58d70",
        "linen": "#f5f0e6"
      },
      fontFamily: {
        serif: ["'EB Garamond'", "Georgia", "serif"],
        sans: ["'DM Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        script: ["'Pinyon Script'", "cursive"],
      },
      letterSpacing: {
        widest: "0.25em",
        editorial: "0.2em",
        meta: "0.15em",
      }
    },
  },
  plugins: [],
};