import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1D3557",
        accent: "#9B4DFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Добавляем шрифт
      },
    },
  },
  plugins: [],
};


export default config;
