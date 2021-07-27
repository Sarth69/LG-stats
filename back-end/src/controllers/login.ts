import { Request, Response } from "express";
import { Player } from "../entities/Player";

import { SessionRequest } from "../types";
import { SignIn } from "../interfaces/SignIn";
import { SignUp } from "../interfaces/SignUp";

import { ParamsDictionary } from "express-serve-static-core";
import bcrypt from "bcryptjs";

export const isUserAuthenticated = (req: Request, res: Response): Response => {
  return res.status(200).json({ auth: true, message: "You are authenticated" });
};

/**
 * Authenticate a player
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const signIn = async (
  req: SessionRequest<ParamsDictionary, unknown, SignIn>,
  res: Response
) => {
  const email = req.body.email;
  const password = req.body.password;

  const player = await Player.findOne({ email });
  if (!player) {
    return res.status(404).json({
      auth: false,
      message: "Erreur de connexion : cet email n'est associé à aucun compte",
    });
  }

  // If we found the player, we compare the hash of his password with
  // the stored hash
  const match = await bcrypt.compare(password, player.password);
  if (!match) {
    return res.status(404).json({
      auth: false,
      message: "Erreur de connexion : mot de passe incorrect",
    });
  }

  req.session.isLogged = true;
  req.session.playerId = player.id;
  return res.status(200).json({ auth: true });
};

/**
 * Register an player
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const signUp = async (
  req: Request<ParamsDictionary, unknown, SignUp>,
  res: Response
) => {
  const player = new Player();

  player.first_name = req.body.firstName;
  player.last_name = req.body.lastName;
  player.email = req.body.email;
  player.tl_nickname = req.body.tl_nickname;
  player.shield = 0;

  // first, we look for the player
  const existingPlayer = await Player.findOne({ email: req.body.email });

  // if we found him, we should not allow to register a new existingPlayer with this same email
  if (existingPlayer) {
    return res
      .status(409)
      .json({ message: "Erreur d'inscription : cet email est déjà utilisé" });
  }

  // No problem, we can add this new player to the database

  // We shall not save a plain text password
  // but only store a hash of the password
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(req.body.password, salt);

  player.password = hash;
  player.save();

  return res.status(200).json({ message: "ok" });
};

/**
 * Destroy the current session
 * @param req
 * @param res
 * @returns
 */
export const signOut = async (req: Request, res: Response): Promise<void> => {
  req.session.destroy((error) => {
    if (error == null) {
      return res.clearCookie("LGSession").send();
    } else {
      console.log("🔥 error", error);
      return res.status(500).json({ message: "sign out error" });
    }
  });
};
