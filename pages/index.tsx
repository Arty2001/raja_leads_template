import "./index.module.css";
// import LogoSVG from "./logo.svg";
import "@mantine/core/styles.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
import React from "react";
import { Nunito } from 'next/font/google';

const nunito = Nunito({weight:["400"],subsets:["latin"]}) 

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#E0E3E7",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#6F7E8C",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
          backgroundColor: "#0C0C0C",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...nunito.style,
          color: "#FFFFFF"
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#0C0C0C",
          color: "#FFFFFF",
          "&::before, &::after": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom:
              "2px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom:
              "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#0C0C0C",
          color: "#FFFFFF",
          "&::before, &::after": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom:
              "2px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom:
              "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
  },
});

function App() {
  const matches = useMediaQuery("(min-width: 56.25em)"); //true if mobile false if not

  return <ThemeProvider theme={defaultTheme}>
    <div> {matches ? 'Mobile' : 'Desktop'} </div>
  </ThemeProvider>
}

export default App;
