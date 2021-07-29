import React from "react";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";

import useStyles from "./HeaderEntry.style";

import RouterLink from "../RouterLink/RouterLink";

function HeaderEntry({ link }) {
  const location = useLocation();
  const classes = useStyles({ active: location.pathname === link.path });

  return (
    <div>
      <RouterLink to={link.path} className={classes.link}>
        <Typography variant="h6" className={classes.name}>
          {link.name}
        </Typography>
      </RouterLink>
    </div>
  );
}

export default HeaderEntry;
