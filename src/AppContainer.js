import React from "react";
import {
  CssBaseline,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  Link,
  Box,
  Container,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import GitHubIcon from "@material-ui/icons/GitHub";

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

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link color="inherit" href="https://release-sonar.web.app/">
      Release Sonar
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

const AppContainer = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container fixed>
      <Box my={2} textAlign="center">
        <Link
          variant="h2"
          href="/"
          underline="none"
          color="inherit"
          gutterBottom
        >
          Release Sonar
        </Link>
      </Box>
      <Box justifyContent="center">{children}</Box>
      <footer>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={6}
          mb={2}
        >
          <Box mb={1}>
            <Link
              color="inherit"
              href="https://github.com/justinhchan/release-sonar"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
            </Link>
          </Box>
          <Copyright />
        </Box>
      </footer>
    </Container>
  </ThemeProvider>
);

export default AppContainer;
