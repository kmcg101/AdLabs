import { createTheme } from "@material-ui/core";
import "./assets/fonts/Avenir-Roman-12.ttf";

export const AppTheme = createTheme({
  typography: {
    fontFamily: ["Avenir-Roman"].join(","),
  },
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#aaaa00",
    },
  },
  overrides: {
    MuiSwitch: {
      switchBase: {
        // Controls default (unchecked) color for the thumb
        color: "#ffffff",
      },
      colorSecondary: {
        "&$checked": {
          // Controls checked color for the thumb
          color: "#ffffff",
        },
      },
      track: {
        // Controls default (unchecked) color for the oval behind the thumb
        opacity: 0.7,
        backgroundColor: "#ffffff",
        "$checked$checked + &": {
          // Controls checked color for the track
          opacity: 0.7,
          backgroundColor: "#009bdb",
        },
      },
    },
  },
});
