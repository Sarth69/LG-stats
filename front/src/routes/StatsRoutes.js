import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Games from "../views/stats/games/Games";
import CustomError from "../views/error/CustomError";

function StatsRoutes() {
  const match = useRouteMatch();
  const error_not_found = {
    code: 404,
    message: "Route not found",
  };

  return (
    <Switch>
      <Route exact path={`${match.path}/`}>
        <Games />
      </Route>
      <Route path={match.path}>
        <CustomError error={error_not_found} />
      </Route>
    </Switch>
  );
}

export default StatsRoutes;
