import React from "react";
import PropTypes from "prop-types";
import { getFormattedDate } from "./utils";
import AlbumTypeIcon from "./AlbumTypeIcon";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const AlbumCard = ({ album }) => {
  const {
    name,
    images,
    release_date: releaseDate,
    artists,
    album_type: albumType,
  } = album;
  const artistNames = artists.map((artist) => artist.name).join(", ");
  const image = images[0];
  const formattedReleaseDate = getFormattedDate(releaseDate);

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <CardMedia
        style={{
          height: 0,
          paddingTop: "100%",
        }}
        title={image.name}
        image={image.url}
      />
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="grid">
            <Typography
              display="block"
              variant="button"
              align="center"
              noWrap
              gutterBottom
            >
              {name}
            </Typography>
          </Box>
          <Typography variant="caption" align="center" gutterBottom>
            {artistNames}
          </Typography>
          <Box mt={2} mb={1}>
            <Typography variant="caption">{formattedReleaseDate}</Typography>
          </Box>
          <AlbumTypeIcon type={albumType} />
        </Box>
      </CardContent>
    </Card>
  );
};

AlbumCard.propTypes = {
  album: PropTypes.object.isRequired,
};

export default AlbumCard;
