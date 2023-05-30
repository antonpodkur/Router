import { ColorScheme, colors, extendTheme } from "@vechaiui/react";


const emeraldLight: ColorScheme = {
  id: "emerald-light",
  type: "light",
  colors: {
    bg: {
      base: colors.white,
      fill: colors.black,
    },
    text: {
      foreground: colors.black,
      muted: colors.black,
    },
    primary: colors.emerald,
    neutral: colors.emerald,
  },
};

const emeraldDark: ColorScheme = {
  id: "emerald-dark",
  type: "dark",
  colors: {
    bg: {
      base: colors.gray["900"],
      fill: colors.gray["800"],
    },
    text: {
      foreground: colors.gray["100"],
      muted: colors.gray["400"],
    },
    primary: colors.emerald,
    neutral: colors.gray,
  },
};

export const Theme = extendTheme({
  cursor: "pointer",
  colorSchemes: {
    "emerald-light": emeraldLight,
    "emerald-dark": emeraldDark,
  },
});
