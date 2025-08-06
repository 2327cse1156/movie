// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#00A3A3",
        "primary-dull": "#1A1A1A",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
