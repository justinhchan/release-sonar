import React, { useState, forwardRef, Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { getAlbumInfo } from "./services";
import { getFormattedDate } from "./utils";
import TrackList from "./TrackList";
import AlbumTypeIcon from "./AlbumTypeIcon";
import Artists from "./Artists";
import LoginButton from "./LoginButton";

import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  albumInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  albumArt: {
    minHeight: "150px",
    minWidth: "150px",
    maxHeight: "300px",
    maxWidth: "300px",
    [theme.breakpoints.only("xs")]: {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(2),
    },
  },
  buttonBase: {
    width: "100%",
    height: "100%",
  },
}));

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const AlbumModal = ({ albumId, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [album, setAlbum] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();
  const loaded = album || errorMessage;

  const loadAlbum = () => {
    getAlbumInfo(albumId)
      .then((response) => setAlbum(response))
      .catch(() =>
        setErrorMessage(
          "An error occured when gathering information for the album."
        )
      );
  };

  const handleClickOpen = () => {
    if (!album) {
      loadAlbum();
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <ButtonBase className={classes.buttonBase} onClick={handleClickOpen}>
        {children}
      </ButtonBase>
      <Dialog
        fullWidth
        TransitionComponent={Transition}
        disableRestoreFocus
        maxWidth="md"
        open={isOpen}
        onClose={handleClose}
      >
        <DialogContent>
          {!loaded ? (
            <LinearProgress />
          ) : (
            <Fragment>
              {errorMessage ? (
                <LoginButton isError notice={errorMessage} />
              ) : (
                <Box display="flex" flexDirection="column">
                  <Box className={classes.albumInfo}>
                    <Box className={classes.albumArt}>
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
                        gutterBottom
                      >
                        {album.name}
                      </Link>
                      <Artists artistObjects={album.artists} />
                      <Typography variant="caption">
                        {getFormattedDate(album.release_date)} ·{" "}
                        {album.tracks.total}{" "}
                        {album.tracks.total > 1 ? "songs" : "song"}
                      </Typography>
                      <Box mt={1}>
                        <AlbumTypeIcon type={album.album_type} showText />
                      </Box>
                    </Box>
                  </Box>
                  <TrackList tracksObject={album.tracks} />
                </Box>
              )}
            </Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

AlbumModal.propTypes = {
  albumId: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default AlbumModal;
