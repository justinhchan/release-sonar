import React, { Fragment, useState, useEffect } from "react";
import { getAlbumsFromFollowedArtists } from "./services";
import {
  sortAlbumsByReleaseDate,
  removeDuplicateAlbums,
  ALBUM_GROUP_TYPES,
} from "./utils";

import AlbumCard, { AlbumCardSkeleton } from "./AlbumCard";
import AlbumModal from "./AlbumModal";
import LoginButton from "./LoginButton";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const GROUP_SIZE = 20;

const AlbumGrid = () => {
  const [nextIndex, setNextIndex] = useState(GROUP_SIZE);
  const [albums, setAlbums] = useState([]);
  const [currentAlbums, setCurrentAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const showShowMoreButton = albums.length > 0 && nextIndex !== 0;
  const loaded = albums.length > 0 || errorMessage;

  useEffect(() => {
    getAlbumsFromFollowedArtists()
      .then((response) => {
        const responseAlbums = removeDuplicateAlbums({ albums: response });
        const sortedAlbums = sortAlbumsByReleaseDate({
          albums: responseAlbums,
        });
        setAlbums(sortedAlbums);
        setCurrentAlbums(sortedAlbums.slice(0, GROUP_SIZE));
        setNextIndex(GROUP_SIZE);
      })
      .catch(() =>
        setErrorMessage("An error occured when getting the albums.")
      );
  }, []);

  const handleClickShowMore = () => {
    const nextIndexToSet = nextIndex + GROUP_SIZE;
    setCurrentAlbums((previousAlbums) =>
      previousAlbums.concat(albums.slice(nextIndex, nextIndexToSet))
    );
    setNextIndex(nextIndexToSet);
  };

  return !loaded ? (
    <Grid container spacing={3}>
      {[...Array(GROUP_SIZE)].map((_, index) => (
        <Grid item xs={6} sm={4} md={3} key={index.toString()}>
          <AlbumCardSkeleton />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Fragment>
      {errorMessage ? (
        <LoginButton isError notice={errorMessage} />
      ) : (
        <Fragment>
          <Grid container spacing={3}>
            {currentAlbums.map((album) => (
              <Fragment key={album.id}>
                {ALBUM_GROUP_TYPES.includes(album.album_type) && (
                  <Grid item xs={6} sm={4} md={3}>
                    <AlbumModal albumId={album.id}>
                      <AlbumCard album={album} />
                    </AlbumModal>
                  </Grid>
                )}
              </Fragment>
            ))}
          </Grid>
          {showShowMoreButton && (
            <Box my={4} textAlign="center">
              <Button variant="contained" onClick={() => handleClickShowMore()}>
                Show More
              </Button>
            </Box>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default AlbumGrid;
