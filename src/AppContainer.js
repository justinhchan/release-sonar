import React from "react";
import {
  CssBaseline,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  Link,
  Box,
  Container,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const COLORS = {
  SPOTIFY_BLACK: "#191414",
  SPOTIFY_GREEN: "#1DB954",
  SPOTIFY_WHITE: "#FFFFFF",
};

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: COLORS.SPOTIFY_BLACK,
    },
    primary: {
      main: COLORS.SPOTIFY_GREEN,
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: COLORS.SPOTIFY_WHITE,
        borderRadius: "50vw",
      },
    },
    MuiLink: {
      underlineHover: {
        "&:hover": {
          color: COLORS.SPOTIFY_GREEN,
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "transparent",
      },
    },
    MuiDialog: {
      paper: {
        backgroundColor: COLORS.SPOTIFY_BLACK,
      },
    },
  },
});

const AppContainer = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed>
        <Box my={2} textAlign="center">
          <Link
            variant="h2"
            gutterBottom
            href="/"
            underline="none"
            color="inherit"
          >
            Release Sonar
          </Link>
        </Box>
        <Box justifyContent="center">{children}</Box>
      </Container>
    </ThemeProvider>
  );
};

export default AppContainer;
