import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",

      padding: theme.spacing(1),

      color: ({ active }) =>
        active ? theme.palette.secondary.main : theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.secondary.light,
      },

      transition: theme.transitions.create("color"),
    },

    linkIcon: {
      flexGrow: 1,
      "& > *": {
        width: "50%",
        height: "50%",
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export default useStyles;
