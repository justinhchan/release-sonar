import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import MuiAlert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";

const Follows = ({ artists }) => {
  if (!artists) {
    return <LinearProgress />;
  }

  return (
    <Grid item xs={12} md={6}>
      {artists.length === 0 ? (
        <MuiAlert elevation={6} variant="filled" severity="info">
          You don't follow any artists. You won't be able to see any releases.
        </MuiAlert>
      ) : (
        <List>
          {artists.map((artist) => {
            const { id, name, images, external_urls } = artist;
            const imageUrl = images && images[0] && images[0].url;
            const externalUrl = external_urls?.spotify;
            return (
              <ListItem key={id}>
                <ListItemAvatar>
                  <Avatar alt={name} src={imageUrl} />
                </ListItemAvatar>
                <Link
                  href={externalUrl}
                  color="inherit"
                  variant="subtitle1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItemText primary={name} />
                </Link>
              </ListItem>
            );
          })}
        </List>
      )}
    </Grid>
  );
};

export default Follows;
