import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      gap: theme.spacing(1),
    },
    list: {
      width: "100%",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "95%",
    },
  })
);

export default useStyles;
