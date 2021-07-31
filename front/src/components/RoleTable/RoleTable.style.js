import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    table: {
      tableLayout: "fixed",
      border: "solid 3px",
      borderColor: theme.palette.primary.main,
    },
    SV: {
      backgroundColor: "#19AD00",
    },
    villageRole: {
      backgroundColor: "#00AFE9",
    },
    wolf: {
      backgroundColor: "#FF0000",
    },
    wolfRole: {
      backgroundColor: "#AB0101",
    },
    wolfAffiliate: {
      backgroundColor: "#F26EFF",
    },
    undecided: {
      backgroundColor: "#FFF800",
    },
    independant: {
      backgroundColor: "#FF8B00",
    },
    countRow: {
      border: "solid 3px",
      borderColor: theme.palette.primary.main,
    },
  })
);

export default useStyles;
