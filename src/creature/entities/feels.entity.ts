import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Feel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    feel_name: string;

    @Column()
    feel_modifier: number;

    @Column()
    feel_measure: string;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}