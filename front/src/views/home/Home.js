import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router";

import loggedInQuery from "../../queries/loggedIn";
import meQuery from "../../queries/me";
import newGameMutation from "../../mutations/newGame";
import useCustomMutation from "../../mutations/useCustomMutation";
import useCustomQuery from "../../queries/useCustomQuery";
import ErrorContext from "../../contexts/Error";

import { Typography, Button } from "@material-ui/core";

function Home() {
  const history = useHistory();
  const { setAxiosError } = useContext(ErrorContext);

  const { data: respData } = useCustomQuery(loggedInQuery());
  const isLoggedIn = respData?.data.isLoggedIn;

  const query = useCustomQuery(meQuery(), {
    enabled: !!isLoggedIn,
    retry: false,
  });

  const mutation = useCustomMutation(newGameMutation);

  const createNewGame = async () => {
    if (query.data?.data.player) {
      mutation.mutate(
        { email: query.data?.data.player.email },
        {
          onSuccess: (resp) => {
            history.push("/game/gm/" + resp.data.id);
          },
          onError: (err) => setAxiosError(err),
        }
      );
    } else {
      history.push("/login");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Bienvenue !</title>
      </Helmet>
      <Typography>Page d'accueil</Typography>
      <Button variant="contained" color="secondary" onClick={createNewGame}>
        Je Mjte la prochaine partie
      </Button>
    </div>
  );
}

export default Home;
