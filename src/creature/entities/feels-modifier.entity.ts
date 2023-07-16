import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";
import {Feel} from "./feel.entity";

@Entity()
export class FeelModifiers {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Feel, (feel) => feel.feelModifiers)
    feel_name: Feel;

    @Column()
    feel_modifier: number;

    @Column()
    feel_measure: string;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}