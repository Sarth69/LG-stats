import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import General from "../views/General";
import CustomError from "../views/error/CustomError";
import Home from "../views/home/Home";
import Login from "../views/login/Login";

import StatsRoutes from "./StatsRoutes";
import GameRoutes from "./GameRoutes";

function Router() {
  const error_not_found = {
    code: 404,
    message: "Route not found",
  };

  return (
    <BrowserRouter>
      <General>
        <Switch>
          <Route path="/stats">
            <StatsRoutes />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/game">
            <GameRoutes />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <CustomError error={error_not_found} />
          </Route>
        </Switch>
      </General>
    </BrowserRouter>
  );
}

export default Router;
