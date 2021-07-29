import React from "react";

import useStyles from "./ErrorDialog.style";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

function ErrorDialog({ message, open, setOpen }) {
  const classes = useStyles();

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} className={classes.root}>
      <DialogTitle>{"Une erreur est survenue"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;
