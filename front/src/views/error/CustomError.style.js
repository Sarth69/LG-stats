import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      margin: theme.spacing(3),
      textAlign: "center",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    errorCode: {
      padding: theme.spacing(1),
      fontWeight: theme.typography.fontWeightBold,
      fontSize: "5rem",
      color: theme.palette.primary.main,
    },
    errorDetails: {},
    cardActions: {
      display: "flex",
      justifyContent: "center",
    },
    button: {
      color: theme.palette.primary.main,
    },
  })
);

export default useStyles;
