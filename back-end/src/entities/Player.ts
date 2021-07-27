import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Achievement } from "./Achievement";
import { Player_game } from "./Player_game";

@Entity({ name: "Player" })
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  tl_nickname: string;

  @Column()
  shield: number;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Achievement, (achievement) => achievement.players)
  @JoinTable()
  achievements: Achievement[];

  @OneToMany(() => Player_game, (player_game) => player_game.player)
  games_relations: Player_game[];

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
