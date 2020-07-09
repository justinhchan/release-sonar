import React from "react";
import {
  CssBaseline,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  Link,
  Box,
  Container,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#191414",
    },
    primary: {
      main: "#1DB954",
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: "white",
        borderRadius: "50vw",
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
