import { ConnectionOptions } from "typeorm";

import { Achievement } from "./entities/Achievement";
import { Game } from "./entities/Game";
import { Player } from "./entities/Player";
import { Player_game } from "./entities/Player_game";
import { Role } from "./entities/Role";

export const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Achievement, Game, Player, Player_game, Role],
};
