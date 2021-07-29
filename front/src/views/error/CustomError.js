import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router";
import useStyles from "./CustomError.style";

function CustomError({ error }) {
  const classes = useStyles();

  const history = useHistory();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Erreur</title>
      </Helmet>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.errorCode}>{error.code}</Typography>
          <Typography className={classes.errorDetails}>
            {error.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button onClick={() => history.push("/")} className={classes.button}>
            Retour
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default CustomError;
