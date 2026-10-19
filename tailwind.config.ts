import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101C33",
        navy: "#101C33",
        gold: "#C9A45C",
        mist: "#F5F7FA",
        slateblue: "#26364D",
        teal: "#16A085"
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
