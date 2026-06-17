/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        sky: {
          950: "#0a0f1e",
          900: "#0d1526",
          800: "#131e38",
          700: "#1a2847",
          600: "#3d6e8c",
          400: "#64a3c8",
        },
        cockpit: {
          green: "#00ff88",
          amber: "#ffb347",
          red: "#ff4444",
          blue: "#4da6ff",
          white: "#e8f4fd",
        },
      },
      fontFamily: {
        mono: ["SpaceMono_400Regular"],
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-bold": ["Inter_700Bold"],
      },
    },
  },
  plugins: [],
};
