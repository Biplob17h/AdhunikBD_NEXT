/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3AAEA7",
        secondary: "#f5f5f5",
        accent: "#28A69F",
        active: "#77A1D3",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(to right, #77A1D3, #79CBCA, #E684AE)",
        "primary-gradient-hover":
          "linear-gradient(to right, #79CBCA, #77A1D3, #E684AE)",
      },
      fontFamily: {
        heading: ["Lato", "serif"],
        body: ["Open Sans", "serif"],
        inter: ["Inter", "serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
