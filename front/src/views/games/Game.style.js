import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    title: {
      textAlign: "center",
    },
    inputField: {
      margin: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      width: "60%",
    },
    signButton: {
      margin: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
    container: {
      display: "flex",
      justifyContent: "center",
    },
    paper: {
      display: "flex",
      justifyContent: "center",
    },
    playerList: {
      borderRadius: "25px",
      borderStyle: "solid",
      margin: theme.spacing(1),
      border: theme.palette.primary.main,
      paddingTop: theme.spacing(1),
    },
    rolesButtonsContainer: {
      verticalAlign: "top",
      height: "80px",
      padding: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "95%",
    },
    list: {
      width: "100%",
    },
    form: {
      width: "100%",
    },
  })
);

export default useStyles;
