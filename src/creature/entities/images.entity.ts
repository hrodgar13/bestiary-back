import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @ManyToOne(() => Creature, (creature) => creature.creature_images)
    creature: Creature
}