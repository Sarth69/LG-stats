import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100vw",
      display: "flex",
      flexDirection: "column",
    },

    close: {
      display: "flex",
      alignItems: "right",
      justifyContent: "space-between",
      flexWrap: "wrap",

      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 500,

      padding: theme.spacing(1),
    },
    closeButton: {
      color: "inherit",
    },

    linkGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "0px",
      padding: theme.spacing(2),
    },

    linkElement: {
      borderTop: "1px solid rgba(0, 0, 0, 0.23)",
      borderLeft: "1px solid rgba(0, 0, 0, 0.23)",

      "&:nth-child(-n+3)": {
        borderTop: "none",
      },
      "&:nth-child(3n+1)": {
        borderLeft: "none",
      },
    },
  })
);

export default useStyles;
