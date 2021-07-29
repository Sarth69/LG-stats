import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      flexDirection: "column",
      marginTop: theme.spacing(1),
    },
    title: {
      alignSelf: "center",
    },
    modeRow: {
      flexDirection: "row",
    },
  })
);

export default useStyles;
