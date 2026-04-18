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
          "Noto Sans JP",
          "system-ui",
          "-apple-system",
          "Helvetica Neue",
          "Hiragino Kaku Gothic ProN",
          "sans-serif",
        ],
        serif: [
          "Noto Serif JP",
          "Hiragino Mincho ProN",
          "Yu Mincho",
          "YuMincho",
          "serif",
        ],
      },
      maxWidth: {
        prose: "68ch",
        content: "1120px",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink.800"),
            "--tw-prose-headings": theme("colors.ink.900"),
            "--tw-prose-links": theme("colors.ink.900"),
            "--tw-prose-bold": theme("colors.ink.900"),
            "--tw-prose-invert-body": theme("colors.ink.200"),
            "--tw-prose-invert-headings": theme("colors.ink.50"),
            "--tw-prose-invert-links": theme("colors.ink.50"),
            maxWidth: "68ch",
            fontSize: "17px",
            lineHeight: "2.0",
            p: { marginTop: "1.4em", marginBottom: "1.4em" },
            h2: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontSize: "1.6em",
              fontWeight: "700",
              letterSpacing: "0.02em",
              marginTop: "3em",
              marginBottom: "1em",
              lineHeight: "1.5",
            },
            h3: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontSize: "1.2em",
              fontWeight: "700",
              marginTop: "2.4em",
              marginBottom: "0.8em",
              lineHeight: "1.55",
            },
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              textDecorationThickness: "1px",
              fontWeight: "500",
            },
            blockquote: {
              fontStyle: "normal",
              borderLeftWidth: "2px",
              borderLeftColor: theme("colors.ink.400"),
              paddingLeft: "1.2em",
              color: theme("colors.ink.600"),
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            hr: { borderColor: theme("colors.ink.200"), marginTop: "3em", marginBottom: "3em" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
