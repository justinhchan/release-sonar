import React from "react";
import "react-virtualized/styles.css";
import { AutoSizer, List } from "react-virtualized";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const MAX_ITEMS_TO_SHOW = 6;
const LIST_ITEM_HEIGHT = 44;

const TrackList = ({ tracksObject }) => {
  const { total, items: tracks } = tracksObject;
  const listHeight =
    LIST_ITEM_HEIGHT * (total > MAX_ITEMS_TO_SHOW ? MAX_ITEMS_TO_SHOW : total);

  const trackNumberWidth = `${Number(total).toString().length}em`;

  const rowRenderer = ({ key, index, style }) => {
    const track = tracks[index];

    return (
      <ListItem
        button
        onClick={() => window.open(track.external_urls.spotify)}
        target="_blank"
        rel="noreferrer"
        divider
        key={key}
        style={style}
      >
        <Box width={trackNumberWidth} mr={1}>
          <ListItemText
            primary={(index + 1).toString()}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </Box>
        <ListItemText
          primary={track.name}
          primaryTypographyProps={{ noWrap: true, variant: "body2" }}
        />
      </ListItem>
    );
  };

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <List
          height={listHeight}
          width={width}
          rowCount={total}
          rowHeight={LIST_ITEM_HEIGHT}
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  );
};

export default TrackList;
