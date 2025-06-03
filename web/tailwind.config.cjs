/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "300px",
      sm: "450px",
      md: "800px",
      lg: "1200px",
      xl: "1280px",
      xxl: "1480px",
    },
    colors: {
      title: "#272221",
      subtitle: "#403937",
      text: "#574F4D",
      label: "#8D8686",
      yellow: "#DBAC2C",
      yellowLight: "#F1E9C9",
      yellowDark: "#C47F17",
      purple: "#8047F8",
      purpleDark: "#4B2995",
      purpleLight: "#EBE5F9",
    },
    backgroundColor: {
      primary: "#FAFAFA",
      secondary: "#F3F2F2",
      alt: "#E6E5E5",
      yellow: "#DBAC2C",
      yellowLight: "#F1E9C9",
      yellowDark: "#C47F17",
      purple: "#8047F8",
      purpleDark: "#4B2995",
      purpleLight: "#EBE5F9",
    },
    fontFamily: {
      title: '"Baloo 2"',
      text: '"Roboto"',
    },
  },
  plugins: [],
};
