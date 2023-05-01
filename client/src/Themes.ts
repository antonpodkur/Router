import { ColorScheme, colors, extendTheme } from "@vechaiui/react";

const macLight: ColorScheme = {
    id: "mac-light",
    type: "light",
    colors: {
      bg: {
        base: colors.gray["100"],
        fill: colors.gray["200"],
      },
      text: {
        foreground: colors.gray["900"],
        muted: colors.gray["700"],
      },
      primary: colors.blue,
      neutral: colors.gray,
    },
  };
  
  const macDark: ColorScheme = {
    id: "mac-dark",
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
      primary: colors.blue,
      neutral: colors.gray,
    },
  };

export const Theme = extendTheme({
cursor: "pointer",
colorSchemes: {
    "mac-light": macLight,
    "mac-dark": macDark,
},
});
  