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
        ink: "#040E18",
        navy: "#0B1722",
        panel: "#12212D",
        line: "#D9D9D9",
        mist: "#F5F5F5",
        slate: "#6B7280",
        signal: "#F02D2B",
        "signal-dark": "#D92321",
        gold: "#d6a84f",
        "gold-soft": "#f3d58a"
      },
      boxShadow: {
        gold: "0 18px 60px rgba(214, 168, 79, 0.16)"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
