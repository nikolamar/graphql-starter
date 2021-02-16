import { theme, extendTheme } from "@chakra-ui/react";

const fonts = { ...theme.fonts, mono: `'Menlo', monospace` };

const breakpoints = ["40em", "52em", "64em"];

const customTheme = extendTheme({
  ...theme,
  fonts,
  breakpoints,
  colors: {
    ...theme.colors,
    /** Example */
    // teal: {
    //   ...theme.colors.teal,
    //   700: "#005661",
    //   500: "#00838e",
    //   300: "#4fb3be",
    // },
  },
});

export default customTheme;
