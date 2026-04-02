import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B5CF6",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1e1b4b",
          foreground: "#a5b4fc",
        },
        muted: {
          DEFAULT: "#1e1b4b",
          foreground: "#818cf8",
        },
        accent: {
          DEFAULT: "#818cf8",
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
