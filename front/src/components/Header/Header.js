import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import React, { useState } from "react";

import Drawer from "../Drawer/Drawer";
import HeaderEntry from "../HeaderEntry/HeaderEntry";
import AccountButton from "../AccountButton/AccountButton";
import useStyles from "./Header.style";

function Header() {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { path: "/", name: "Accueil", icon: <HomeIcon /> },
    { path: "/stats", name: "Statistiques", icon: <EqualizerIcon /> },
  ];

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden smUp>
          <IconButton
            edge="start"
            className={classes.menu}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={drawerOpen} setOpen={setDrawerOpen} links={links} />
        </Hidden>
        <img src="/images/logo3.png" alt="Logo" className={classes.logo} />

        <Hidden xsDown>
          <div className={classes.links}>
            {links.map((link) => {
              return <HeaderEntry link={link} key={link.path} />;
            })}
          </div>
        </Hidden>

        <div className={classes.alignIcons}>
          <AccountButton />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
