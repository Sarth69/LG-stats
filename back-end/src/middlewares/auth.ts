import { NextFunction, Response } from "express";
import { Player } from "../entities/Player";

import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { SessionRequest } from "../types";

/**
 * Middleware to verify if user was correctly signed in
 *
 * @example
 * app.use(
    "/test-admin-rights",
    verifyIsLogged,
    (req, res) => {
      return res.json({ message: "you are admin, wonderful!" });
    }
  );
 *
 *
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export function verifyIsLogged<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
>(
  req: SessionRequest<P, ResBody, ReqBody, ReqQuery>,
  res: Response,
  next: NextFunction
): NextFunction | Response {
  if (!req.session.isLogged) {
    return res
      .status(403)
      .json({ auth: false, message: "error : not connected" });
  }

  if (req.session.playerId == undefined) {
    return res.status(403).json({
      auth: false,
      message: "error : invalid connection",
    });
  }

  next();
}
