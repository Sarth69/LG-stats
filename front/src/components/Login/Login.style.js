import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    },
    inputField: {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
    },
    forgot: {
      alignSelf: "flex-end",
    },
    signButton: {
      margin: theme.spacing(1),
    },
  })
);

export default useStyles;
