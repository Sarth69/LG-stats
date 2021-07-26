import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Game } from "./Game";
import { Achievement } from "./Achievement";
import { Role } from "./Role";
import { Player_game } from "./Player_game";

@Entity({ name: "Player" })
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tl_nickname: string;

  @Column()
  shield: number;

  @Column()
  image: string;

  @ManyToMany(() => Achievement, (achievement) => achievement.players)
  achievements: Achievement[];

  @OneToMany(() => Player_game, (player_game) => player_game.player)
  games_relation: Player_game;
}