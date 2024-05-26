/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,75%,100%": { opacity: "1" },
          "25%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
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
