import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    inputField: {
      margin: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
      width: "45%",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "45%",
      display: "flex",
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
    description: {
      margin: theme.spacing(1),
    },
  })
);

export default useStyles;
