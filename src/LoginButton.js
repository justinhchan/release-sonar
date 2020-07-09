import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { AUTHORIZATION } from "./utils";

const LoginButton = ({ href, isError, notice, text }) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    {notice && (
      <Typography color={isError ? "error" : "initial"} variant="overline">
        {notice}
      </Typography>
    )}
    <Box mt={1}>
      <Button color="primary" variant="contained" href={href}>
        {text}
      </Button>
    </Box>
  </Box>
);

LoginButton.propTypes = {
  href: PropTypes.string,
  isError: PropTypes.bool,
  notice: PropTypes.string,
  text: PropTypes.string,
};

LoginButton.defaultProps = {
  href: AUTHORIZATION.URI,
  isError: false,
  notice: "",
  text: "Login to Spotify",
};

export default LoginButton;
