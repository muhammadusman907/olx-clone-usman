/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: { max: "767px" },
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
    },
    // => @media (min-width: 1024px) { ... }
    extend: {},
    colors: {
      primary: "#388087",
      secondary: "#F6F6F2",
      default: "#f6ffed",
      
    },
  },
  plugins: [],
};

// 4a5759 dedbd2