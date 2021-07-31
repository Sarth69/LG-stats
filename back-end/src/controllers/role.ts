import { Response, Request } from "express";
import { Player } from "../entities/Player";
import { SessionRequest } from "../types";
import { Game, Status } from "../entities/Game";
import { Player_game } from "../entities/Player_game";
import { Role, Side } from "../entities/Role";
import { GameID } from "../interfaces/GameID";

/**
 * Returns info for the player registerd in session.playerID
 *
 * @param req
 * @param res
 * @returns
 */
export const newRole = async (
  req: SessionRequest,
  res: Response
): Promise<Response> => {
  const role = await Role.findOne({ name: req.body.name });
  if (role) {
    return res.status(409).json({ message: "Role already exists" });
  }
  const newRole = new Role();
  newRole.name = req.body.name;
  newRole.description = req.body.description;
  newRole.side = req.body.side;
  await newRole.save();

  const roles = await Role.find();
  roles.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });

  return res.status(200).json({ data: roles });
};

export const getRoles = async (
  req: SessionRequest,
  res: Response
): Promise<Response> => {
  const roles = await Role.find();
  roles.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  return res.status(200).json(roles);
};
