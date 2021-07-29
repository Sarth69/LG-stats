import Typography from "@material-ui/core/Typography";
import React from "react";
import useStyles from "./Games.style";

function Games() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Historique des parties</Typography>
    </div>
  );
}

export default Games;
