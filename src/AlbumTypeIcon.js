import React from "react";
import PropTypes from "prop-types";
import { ALBUM_GROUP_TYPES } from "./utils";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

const ALBUM_TYPE_ICONS = {
  album: AlbumIcon,
  single: MusicNoteIcon,
};

const AlbumTypeIcon = ({ showText, type }) => {
  const Icon = ALBUM_TYPE_ICONS[type];
  const text = showText ? type.charAt(0).toUpperCase() + type.slice(1) : null;

  return !Icon ? null : (
    <Box display="flex" alignItems="center">
      <Icon />
      {text && (
        <Box ml={1}>
          <Typography variant="body2">{text}</Typography>
        </Box>
      )}
    </Box>
  );
};

AlbumTypeIcon.propTypes = {
  type: PropTypes.oneOf(ALBUM_GROUP_TYPES).isRequired,
  showText: PropTypes.bool,
};

AlbumTypeIcon.defaultProps = {
  showText: false,
};

export default AlbumTypeIcon;
