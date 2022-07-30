/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // colors: {
    //   brown: "brown",
    //   deeppink: "deeppink",
    //   navy: "#ffffff",
    //   wheat: "wheat",
    //   midnight: "#121063",
    //   metal: "#565584",
    //   tahiti: "#3ab7bf",
    //   orange: "orange",
    //   "bubble-gum": "#ff77e9",
    //   bermuda: "#78dcca",
    //   green :  "#22c55e"
    // },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
