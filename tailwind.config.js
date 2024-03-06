/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: { max: "768px" },
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
    },
    // => @media (min-width: 1024px) { ... }
    extend: {},
    colors: {
      primary: "#444444",
      secondary: "#dddddd",
      white: "#ffffff",
      default: "#f6ffed",
      card_bg: "#eeeeee",
      hover: "#999999",
    },
  },
  plugins: [],
};

// 4a5759 dedbd2
//  primary: "#388087",
