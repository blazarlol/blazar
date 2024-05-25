/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "dark",
      "light",
      // {
      //   dark: {
      //     accent: "#EDD8E9",
      //   },
      // },
    ],
    darkTheme: "dark",
    base: true,
    themeRoot: ":root",
  },
};
