/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#fafaf9",
          100: "#f3f2f0",
          200: "#e6e4e0",
          300: "#c9c6bf",
          400: "#99958c",
          500: "#6e6b62",
          600: "#4a4842",
          700: "#2f2e29",
          800: "#1f1e1a",
          900: "#0f0e0c",
        },
        accent: {
          DEFAULT: "#b8935a",
          soft: "#ede3cd",
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
            maxWidth: "68ch",
            fontSize: "17px",
            lineHeight: "1.95",
            p: { marginTop: "1.4em", marginBottom: "1.4em" },
            h2: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontSize: "1.55em",
              fontWeight: "700",
              letterSpacing: "0.02em",
              marginTop: "3em",
              marginBottom: "1em",
              lineHeight: "1.5",
            },
            h3: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontSize: "1.2em",
              fontWeight: "600",
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
            strong: { fontWeight: "700" },
            blockquote: {
              fontStyle: "normal",
              borderLeftWidth: "2px",
              borderLeftColor: theme("colors.ink.300"),
              paddingLeft: "1.2em",
              color: theme("colors.ink.600"),
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            hr: { borderColor: theme("colors.ink.200"), marginTop: "3.5em", marginBottom: "3.5em" },
            table: { fontSize: "0.95em" },
            "thead th": { fontWeight: "600" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
