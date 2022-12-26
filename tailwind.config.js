/* eslint-disable @typescript-eslint/no-var-requires */
/** @see https://www.nativewind.dev/guides/postcss */
// const nativewind = require("nativewind/tailwind/css")
const nativewind = require("nativewind/tailwind/native");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nativewind()],
};
