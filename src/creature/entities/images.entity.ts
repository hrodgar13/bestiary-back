import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Creature, (creature) => creature.images)
    creature_id: number
}