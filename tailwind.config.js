/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A192f",
        secondary: "#F97316",
        tertiary: "#54D6B8",
      },
    },
    screens: {
      lg: { max: "2024px" },
      sm: { max: "1000px" },

      // xs: "480px",   // extra small devices
      // sm: "640px",   // default Tailwind
      // md: "768px",
      // lg: "1024px",
      // xl: "1280px",
      // "2xl": "1536px",

      // // Custom ones 👇
      // tablet: "900px",
      // laptop: "1200px",
      // desktop: "1400px",
    },
  },
  plugins: [],
};
