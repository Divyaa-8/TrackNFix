/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213d",
        brand: "#2563eb",
        mint: "#0f766e",
        coral: "#f97316"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(20, 33, 61, 0.08)"
      }
    }
  },
  plugins: []
};
