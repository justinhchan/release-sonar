import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

import { AUTHORIZATION } from "./utils";

const LoginButton = ({ href, isError, notice, text }) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    {notice && <Alert severity={isError ? "error" : "info"}>{notice}</Alert>}
    <Box mt={2}>
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
