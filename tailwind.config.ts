import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          50: "#f0fdf4",
          500: "#16a34a",
          700: "#15803d",
          900: "#064e3b",
        },
        accent: {
          DEFAULT: "#f59e0b",
          dark: "#b45309",
        },
      },
      fontFamily: {
        display: ["'Inter'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "pitch-gradient":
          "radial-gradient(ellipse at top, #064e3b 0%, #0f172a 60%, #020617 100%)",
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
