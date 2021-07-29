import { Response } from "express";
import { Player } from "../entities/Player";
import { SessionRequest } from "../types";

/**
 * Returns info for the player registerd in session.playerID
 *
 * @param req
 * @param res
 * @returns
 */
export const getMe = async (req: SessionRequest, res: Response) => {
  if (req.session.playerId == undefined) {
    return res
      .status(500)
      .json({ message: "An error occured server side, please try again" });
  }

  const player = await Player.findOne(
    { id: req.session.playerId },
    { relations: ["achievements", "games_relations"] }
  );
  if (!player) {
    return res.status(404).json({ message: "Email not registered" });
  }

  // we remove player password for security reasons
  const responseplayer = {
    firstName: player.first_name,
    lastName: player.last_name,
    tlNickname: player.tl_nickname,
    email: player.email,
    shield: player.shield,
    image: player.image ? player.image : undefined,
    achievements: player.achievements,
    gamesRelations: player.games_relations,
  };
  return res.status(200).json({ player: responseplayer });
};

export const checkIsLogged = async (req: SessionRequest, res: Response) => {
  if (req.session.playerId) {
    return res.status(200).json({ isLoggedIn: true });
  }

  return res.status(200).send();
};

export const getPlayers = async (req: SessionRequest, res: Response) => {
  const players = await Player.find();
  console.log(players);
  return res.status(200).json(players);
};
