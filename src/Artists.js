import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const Artists = ({ artistObjects }) => (
  <Box>
    By&nbsp;
    <Fragment>
      {artistObjects.map((artist, index) => (
        <Fragment key={artist.name}>
          <Link
            href={artist.external_urls.spotify}
            color="inherit"
            variant="subtitle1"
            target="_blank"
            rel="noreferrer"
          >
            {artist.name}
          </Link>
          <span>{index < artistObjects.length - 1 ? ", " : ""}</span>
        </Fragment>
      ))}
    </Fragment>
  </Box>
);

Artists.propTypes = {
  artistObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Artists;
