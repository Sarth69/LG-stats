import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Game } from "./Game";
import { Achievement } from "./Achievement";
import { Role } from "./Role";
import { Player } from "./Player";

@Entity({ name: "Player_game" })
export class Player_game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.games_relations)
  player: Player;

  @ManyToOne(() => Game, (game) => game.players_relations)
  game: Game;

  @ManyToOne(() => Role, (role) => role.players_relations)
  role: Role;

  @Column()
  win: boolean;
}
