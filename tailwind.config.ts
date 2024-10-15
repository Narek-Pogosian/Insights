import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xl: "1240px",
      },
    },
    borderRadius: {
      sm: "calc(var(--radius) - 2px)",
      DEFAULT: "var(--radius)",
      md: "calc(var(--radius) + 2px)",
      full: "999px",
      none: "0px",
    },
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: colors.black,
      white: colors.white,
      neutral: colors.zinc,
      red: colors.red,
    },
    extend: {
      fontFamily: {
        sans: ["Arial", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          muted: "hsl(var(--foreground-muted))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          popover: "hsl(var(--background-popover))",
          input: "hsl(var(--background-input))",
          card: "hsl(var(--background-card))",
        },
        accent: "hsla(var(--accent))",
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
