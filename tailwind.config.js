/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Modern Tailwind includes most colors by default
        // Only extend if you need custom colors
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
