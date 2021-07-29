import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MaterialDrawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import useStyles from "./Drawer.style";
import DrawerEntry from "../DrawerEntry/DrawerEntry";

function Drawer({ open, setOpen, links }) {
  const classes = useStyles();

  const location = useLocation();

  const onDrawerClose = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  // Close the drawer when changing location
  useEffect(() => setOpen(false), [location, setOpen]);

  return (
    <MaterialDrawer anchor="left" open={open} onClose={onDrawerClose}>
      <div className={classes.container}>
        <div className={classes.close}>
          <IconButton
            className={classes.closeButton}
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className={classes.linkGrid}>
          {links.map((link) => {
            return (
              <DrawerEntry
                link={link}
                className={classes.linkElement}
                key={link.path}
              />
            );
          })}
        </div>
      </div>
    </MaterialDrawer>
  );
}

export default Drawer;
