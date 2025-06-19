/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#206F30",
        secondary: "#80B82C",
        light: {
          "100": "#FFFFFF",
        },
        dark: {
          "100": "#000000",
          "800": "#707070",
        },
      },
    },
  },
  plugins: [],
}