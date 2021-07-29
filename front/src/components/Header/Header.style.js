import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: theme.palette.primary.main,
    },

    toolbar: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      gap: theme.spacing(1),
    },

    menu: {},

    logo: {
      height: "100%",
      width: "60px",
    },

    links: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        flexGrow: 1,
        display: "flex",
        gap: theme.spacing(3),
        marginLeft: theme.spacing(2),
      },
    },

    alignIcons: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
    },
  })
);

export default useStyles;
