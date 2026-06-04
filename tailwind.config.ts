import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        navy: "#07111f",
        panel: "#0d1828",
        line: "#21314a",
        gold: "#d6a84f",
        "gold-soft": "#f3d58a"
      },
      boxShadow: {
        gold: "0 18px 60px rgba(214, 168, 79, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
