import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-app)", "Comic Sans MS", "Nunito", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          rosu: "#EF476F",
          galben: "#FFD166",
          verde: "#06D6A0",
          albastru: "#118AB2",
          inchis: "#073B4C",
        },
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
