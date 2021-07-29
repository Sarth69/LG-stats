import { Button, withStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import React, { useCallback } from "react";

import ExitToApp from "@material-ui/icons/ExitToAppOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import loggedInQuery from "../../queries/loggedIn";
import meQuery from "../../queries/me";
import signOutMutation from "../../mutations/signOut";
import useCustomMutation from "../../mutations/useCustomMutation";
import useCustomQuery from "../../queries/useCustomQuery";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import useStyles from "./AccountButton.style";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function AccountButton({ className }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const queryClient = useQueryClient();

  // Check if the user is logged in
  const { data: respData } = useCustomQuery(loggedInQuery());
  const isLoggedIn = respData?.data.isLoggedIn;

  const query = useCustomQuery(meQuery(), {
    enabled: !!isLoggedIn,
    retry: false,
  });

  const mutation = useCustomMutation(signOutMutation);

  const signOut = useCallback(() => {
    mutation.mutate(
      {},
      {
        onSettled: () => {
          queryClient.invalidateQueries(loggedInQuery().key);
          queryClient.invalidateQueries(meQuery().key);
          history.push("/login");
        },
      }
    );
    setAnchorEl(false);
  }, [history, mutation, queryClient]);

  const handleClick = (event) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      history.push("/login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        startIcon={<PersonIcon className={classes.icon} />}
        className={`${className} ${classes.root}`}
        onClick={handleClick}
      >
        {respData?.data.isLoggedIn && query.isSuccess ? (
          <div style={{ justifyContent: "space-between" }}>
            <Typography className={classes.text}>
              {query.data.data.player.firstName}
            </Typography>
            <Typography className={classes.text}>
              {"@" + query.data.data.player.tlNickname}
            </Typography>
          </div>
        ) : (
          "Connexion"
        )}
      </Button>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={signOut}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default AccountButton;
