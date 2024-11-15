/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tertiary: "#151030",
        primary: {
          DEFAULT: "#8D33FF",
          foreground: "#4B336F",
          hover: "#7E30F5",
        },
        accent: {
          DEFAULT: "#1f2937",
          foreground: "#ffffff",
          navbar: "#573B82",
        },
      },
    },
  },
  plugins: [],
};
