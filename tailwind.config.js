const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["League Spartan", ...defaultTheme.fontFamily.sans],
        cursive: ["Raleway"],
      },
    },
    colors: {
      "p-cyan": "#19F4FF",
      "p-white": "#E0E1DD",
      "p-black": "#040F0F",
      "p-green": "#5AFF15",
      "p-gray": "#2F2F2F",
    },
  },
  plugins: [],
};
