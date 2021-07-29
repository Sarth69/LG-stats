import React from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";

import useStyles from "./DrawerEntry.style";

import RouterLink from "../RouterLink/RouterLink";

function DrawerEntry({ link, className }) {
  const location = useLocation();
  const classes = useStyles({ active: location.pathname === link.path });

  return (
    <RouterLink to={link.path} className={`${classes.root} ${className || ""}`}>
      <div className={classes.linkIcon}>{link.icon}</div>
      <Typography>{link.name}</Typography>
    </RouterLink>
  );
}

export default DrawerEntry;
