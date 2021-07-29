import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import GMGame from "../views/games/GMGame";
import CustomError from "../views/error/CustomError";

function GameRoutes() {
  const match = useRouteMatch();
  const error_not_found = {
    code: 404,
    message: "Route not found",
  };

  return (
    <Switch>
      <Route exact path={`${match.path}/gm/:id`}>
        <GMGame />
      </Route>
      <Route path={match.path}>
        <CustomError error={error_not_found} />
      </Route>
    </Switch>
  );
}

export default GameRoutes;
