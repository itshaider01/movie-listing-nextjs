import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#093545",
        "background-100": "#092C39",
        foreground: "#224957",
        primary: "#2BD17E",
      },
      fontFamily: {
        montserrat: ["Montserrat", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
