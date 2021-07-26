import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Player_game } from "./Player_game";

export enum Side {
  SV = "SV",
  VillageRole = "VillageRole",
  Wolf = "Wolf",
  WolfRole = "WolfRole",
  WolfAffiliate = "WolfAffiliate",
  Undecided = "Undecided",
  Independant = "Independant",
}

@Entity({ name: "Role" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  side: Side;

  @OneToMany(() => Player_game, (player_game) => player_game.role)
  players_relation: Player_game[];
}
