export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2B6FFF",
        "blue-dark": "#1E4FD8",
        bg: "#E4E6EC",
        danger: "#E5484D",
    },
    boxShadow: {
      card: "0px 10px 30px rgba(0,0,0,0.05)",
    },},
  },
  plugins: [],
}