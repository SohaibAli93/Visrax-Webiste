import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#030303",
        night: "#050506",
        panel: "#0a0a0c",
        line: "rgba(255, 255, 255, 0.1)",
        violet: "#7c3cff",
        electric: "#214cff",
        cyan: "#8ca7ff",
        accent: "#93a8ff"
      },
      boxShadow: {
        glow: "0 0 80px rgba(33, 76, 255, 0.18)",
        panel: "0 28px 90px rgba(0, 0, 0, 0.55)",
        soft: "0 16px 48px rgba(0, 0, 0, 0.35)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.055em"
      },
      maxWidth: {
        "8xl": "88rem"
      }
    }
  },
  plugins: []
};

export default config;
