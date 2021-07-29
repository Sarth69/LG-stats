import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      gap: theme.spacing(1),
    },
    icon: {
      color: theme.palette.text.primary,
    },
    text: {
      color: theme.palette.text.primary,
      [theme.breakpoints.down(350)]: {
        display: "none",
      },
    },
  })
);

export default useStyles;
