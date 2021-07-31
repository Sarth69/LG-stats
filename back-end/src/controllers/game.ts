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
export const newGame = async (req: SessionRequest, res: Response) => {
  const player = await Player.findOne({ email: req.body.email });
  if (!player) {
    return res.status(404).json({ message: "Player not registered" });
  }

  const game = await Game.findOne({ status: Status.Prepare });

  if (game) {
    return res
      .status(409)
      .json({ message: "A game is already in preparation" });
  }

  let newGame = new Game();
  newGame.status = Status.Prepare;
  newGame = await newGame.save();

  let gmRole = await Role.findOne({ side: Side.GM });

  if (!gmRole) {
    const newRole = new Role();
    newRole.name = "Game Master";
    newRole.side = Side.GM;
    gmRole = await newRole.save();
  }

  let newPlayerGame = new Player_game();
  newPlayerGame.role = gmRole;
  newPlayerGame.player = player;
  newPlayerGame.game = newGame;
  newPlayerGame = await newPlayerGame.save();

  return res.status(200).json({ id: newGame.id });
};

export async function getGame(
  req: Request<GameID>,
  res: Response
): Promise<Response> {
  const game = await Game.findOne(parseInt(req.params.id), {
    relations: [
      "players_relations",
      "players_relations.player",
      "players_relations.role",
    ],
  });
  if (!game) {
    return res.status(404).json({ message: "Game with this id doesn't exist" });
  }
  return res.status(200).json(game);
}

export const setDate = async (req: SessionRequest, res: Response) => {
  await Game.update(req.body.gameID, {
    start_date: req.body.start_date,
  });
  const game = await Game.findOne(req.body.gameID, {
    relations: [
      "players_relations",
      "players_relations.player",
      "players_relations.role",
    ],
  });
  console.log(game);
  return res.status(200).json({ data: game });
};

export const deletePlayer = async (req: SessionRequest, res: Response) => {
  const player_game = await Player_game.findOne(req.body.players_relation.id, {
    relations: ["game"],
  });
  const gameID = player_game.game.id;
  await Player_game.delete(req.body.players_relation.id);
  const game = await Game.findOne(gameID, {
    relations: [
      "players_relations",
      "players_relations.player",
      "players_relations.role",
    ],
  });
  return res.status(200).json({ data: game });
};

export const newGM = async (req: SessionRequest, res: Response) => {
  const player = await Player.findOne(req.body.playerID);
  if (!player) {
    return res.status(404).json({ message: "Player not registered" });
  }

  let game = await Game.findOne(req.body.gameID);
  const gmRole = await Role.findOne({ side: Side.GM });

  let newPlayerGame = new Player_game();
  newPlayerGame.role = gmRole;
  newPlayerGame.player = player;
  newPlayerGame.game = game;
  newPlayerGame = await newPlayerGame.save();

  game = await Game.findOne(req.body.gameID, {
    relations: [
      "players_relations",
      "players_relations.player",
      "players_relations.role",
    ],
  });

  return res.status(200).json({ data: game });
};

export const newPlayer = async (req: SessionRequest, res: Response) => {
  const player = await Player.findOne(req.body.playerID);
  if (!player) {
    return res.status(404).json({ message: "Player not registered" });
  }

  let game = await Game.findOne(req.body.gameID);

  let newPlayerGame = new Player_game();
  newPlayerGame.player = player;
  newPlayerGame.game = game;
  newPlayerGame = await newPlayerGame.save();

  game = await Game.findOne(req.body.gameID, {
    relations: [
      "players_relations",
      "players_relations.player",
      "players_relations.role",
    ],
  });

  return res.status(200).json({ data: game });
};

export const newRole = async (req: SessionRequest, res: Response) => {
  const role = await Role.findOne({ name: req.body.name });
  if (!role) {
    return res.status(404).json({ message: "This role doesn't exist" });
  }

  let game = await Game.findOne(req.body.gameID);

  let newPlayerGame = new Player_game();
  newPlayerGame.role = role;
  newPlayerGame.game = game;
  newPlayerGame = await newPlayerGame.save();

  game = await Game.findOne(req.body.gameID, {
    relations: [
      "players_relations",
      "players_relations.player",
      "players_relations.role",
    ],
  });

  return res.status(200).json({ data: game });
};

export const deleteRole = async (req: SessionRequest, res: Response) => {
  const role = await Role.findOne({ name: req.body.name });
  const game = await Game.findOne(parseInt(req.body.gameID));
  const player_game = await Player_game.findOne({ role: role, game: game });
  await Player_game.delete(player_game.id);

  const gameToReturn = await Game.findOne(req.body.gameID, {
    relations: [
      "players_relations",
      "players_relations.player",
      "players_relations.role",
    ],
  });
  return res.status(200).json({ data: gameToReturn });
};
