import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        coffee: {
          950: "#241609",
          900: "#331f10",
          800: "#432a17",
          700: "#5a3a20",
          600: "#74502c",
          500: "#8f6640",
          400: "#a9805a",
        },
        cream: {
          50: "#fdfaf5",
          100: "#f8f1e6",
          200: "#f0e4d0",
          300: "#e6d3b4",
        },
        gold: {
          500: "#b6894a",
          400: "#c9a066",
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
