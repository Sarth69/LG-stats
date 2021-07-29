import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Player_game } from "./Player_game";

export enum Status {
  Prepare = "préparation",
  InProgress = "en cours",
  Finished = "terminée",
  Inscription = "inscription",
}

@Entity({ name: "Game" })
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  comments: string;

  @OneToMany(() => Player_game, (player_game) => player_game.game)
  players_relations: Player_game[];

  @Column({ nullable: true })
  status: Status;
}
