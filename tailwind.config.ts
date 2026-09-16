import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: "#101828",
        purple: "#6C4CF1",
        orange: "#FF7A18",
        pink: "#F43F8C",
        green: "#16A34A",
        cyan: "#06B6D4",
        yellow: "#FACC15",
        offwhite: "#F8FAFC",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(16, 24, 40, 0.35)",
        card: "0 10px 30px -12px rgba(16, 24, 40, 0.25)",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.97)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blob: "blob 14s infinite ease-in-out",
        "count-up": "count-up 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
