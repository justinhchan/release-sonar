import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { getAlbumInfo } from "./services";
import { getFormattedDate } from "./utils";
import TrackList from "./TrackList";
import AlbumTypeIcon from "./AlbumTypeIcon";

import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

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

const AlbumModal = ({ albumId, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [album, setAlbum] = useState(null);
  const isLoading = !album;

  const loadAlbum = () => {
    getAlbumInfo(albumId)
      .then((response) => setAlbum(response))
      .catch((err) => console.log("catch", err));
  };

  const handleClickOpen = () => {
    setIsOpen(true);
    if (!album) {
      loadAlbum();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <ButtonBase
        style={{ width: "100%", height: "100%" }}
        onClick={handleClickOpen}
      >
        {children}
      </ButtonBase>
      <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Fragment>
            <DialogContent>
              <Box display="flex" flexDirection="column">
                <Box display="flex" mb={1}>
                  <Box width="50%" height="50%" mr={2}>
                    <img
                      src={album.images[0].url}
                      alt={album.name}
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <Link
                      variant="h6"
                      href={album.external_urls.spotify}
                      color="inherit"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {album.name}
                    </Link>
                    <Artists artistObjects={album.artists} />
                    <Typography variant="caption">
                      {getFormattedDate(album.release_date)} ·{" "}
                      {album.tracks.total} songs
                    </Typography>
                    <Box mt={1}>
                      <AlbumTypeIcon type={album.album_type} showText />
                    </Box>
                  </Box>
                </Box>
                <TrackList tracksObject={album.tracks} />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Fragment>
        )}
      </Dialog>
    </Fragment>
  );
};

AlbumModal.propTypes = {
  albumId: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default AlbumModal;
