/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#3e4eb1",
        customPink: "#f02059",
        paleBlue: "#dbe1eb",
      },
    },
  },
  plugins: [],
};
