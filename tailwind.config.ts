import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Extraído por amostragem de pixel de imagens/logo.png (marca oficial Marins Cafés).
        marine: {
          950: "#081826",
          900: "#0c2944",
          800: "#173653",
          700: "#224564",
          600: "#345875",
          500: "#4d6f8a",
          400: "#7695a8",
        },
        cream: {
          50: "#fdfaf5",
          100: "#f8f1e6",
          200: "#f0e4d0",
          300: "#e6d3b4",
        },
        gold: {
          500: "#c9a03e",
          400: "#dbb968",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
