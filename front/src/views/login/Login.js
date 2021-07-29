import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

import SignIn from "../../components/Login/SignIn";
import SignUp from "../../components/Login/SignUp";
import useStyles from "./Login.style";

function Login() {
  const classes = useStyles();
  const [hasAnAccount, setHasAnAccount] = useState(true);

  return (
    <div className={classes.container}>
      <Helmet>
        <title>Connexion</title>
      </Helmet>
      <div className={classes.modeRow}>
        <Button
          color={hasAnAccount ? "secondary" : "default"}
          className={classes.title}
          onClick={() => {
            setHasAnAccount(true);
          }}
        >
          Connexion
        </Button>
        <Button
          color={!hasAnAccount ? "secondary" : "default"}
          className={classes.title}
          onClick={() => {
            setHasAnAccount(false);
          }}
        >
          Inscription
        </Button>
      </div>
      {hasAnAccount ? <SignIn /> : <SignUp setHasAccount={setHasAnAccount} />}
    </div>
  );
}

export default Login;
