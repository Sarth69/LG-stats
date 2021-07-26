import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Player_game } from "./Player_game";

@Entity({ name: "Game" })
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  comments: string;

  @OneToMany(() => Player_game, (player_game) => player_game.game)
  players_relation: Player_game;
}
