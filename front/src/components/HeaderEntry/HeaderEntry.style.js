import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    link: {
      display: "inline-block",
      position: "relative",

      padding: theme.spacing(1, 0),

      "&:hover": {
        "&:after": {
          transform: "scaleY(1)",
        },
        "& > .MuiTypography-root": {
          transform: "translateY(3px)",
        },
      },

      "&:before": {
        display: "block",
        content: '""',
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "8px",
        backgroundColor: theme.palette.secondary.contrastText,
      },
      "&:after": {
        display: "block",
        content: '""',
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "8px",
        backgroundColor: theme.palette.secondary.main,

        transform: ({ active }) => !active && "scaleY(0)",
        transformOrigin: "top",
        transition: theme.transitions.create("transform"),
      },
    },
    name: {
      color: "#3c3c3c",
      transition: theme.transitions.create("transform"),
    },
  })
);

export default useStyles;
