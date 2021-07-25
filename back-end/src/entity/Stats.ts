import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Stats" })
export class Stats extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
