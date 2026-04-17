/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f6",
          100: "#eeeeec",
          200: "#d9d8d4",
          300: "#b8b6af",
          400: "#8f8c83",
          500: "#6b6860",
          600: "#4d4b44",
          700: "#36342f",
          800: "#23221e",
          900: "#15140f",
        },
        accent: {
          DEFAULT: "#c9a96e",
          soft: "#e8dcc3",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans JP",
          "system-ui",
          "-apple-system",
          "Helvetica Neue",
          "sans-serif",
        ],
        serif: ["Noto Serif JP", "Georgia", "serif"],
      },
      maxWidth: {
        prose: "68ch",
        content: "1120px",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink.700"),
            "--tw-prose-headings": theme("colors.ink.900"),
            "--tw-prose-links": theme("colors.ink.900"),
            "--tw-prose-bold": theme("colors.ink.900"),
            "--tw-prose-invert-body": theme("colors.ink.200"),
            "--tw-prose-invert-headings": theme("colors.ink.50"),
            "--tw-prose-invert-links": theme("colors.accent.DEFAULT"),
            maxWidth: "68ch",
            lineHeight: "1.85",
            h2: { marginTop: "2.5em", marginBottom: "0.8em" },
            h3: { marginTop: "2em", marginBottom: "0.6em" },
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              textDecorationThickness: "1px",
              fontWeight: "500",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
