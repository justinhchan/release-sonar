import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AlbumGrid from "./AlbumGrid.js";
import Follows from "./Follows.js";
import { getFollowedArtists } from "./services.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

const AppTabs = () => {
  const [followedArtists, setFollowedArtists] = useState();
  const [value, setValue] = React.useState(0);
  const shouldDisableReleasesTab =
    !followedArtists || followedArtists.length === 0;

  const handleChangeTab = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getFollowedArtists().then((artists) => {
      setFollowedArtists(artists);
    });
  }, []);

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChangeTab}>
          <Tab label="Artists You Follow" />
          <Tab label="All Releases" disabled={shouldDisableReleasesTab} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Follows artists={followedArtists} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AlbumGrid artists={followedArtists} />
      </TabPanel>
    </>
  );
};

export default AppTabs;
