import { createMuiTheme } from "@material-ui/core/styles"

export const darkTheme = createMuiTheme({
  shadows: ["none"],
  typography: {
    h2: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 550,
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1rem",
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#8C30F5",
    },
    secondary: {
      main: "#F1E4FF",
      contrastText: "#8C30F5",
    },
  },
  root: {
    textDecoration: "none",
  },
  text: {
    primary: "#333333",
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: "white",
        boxShadow: "none",
      },
      colorPrimary: {
        backgroundColor: "white",
      },
    },
  },
})
