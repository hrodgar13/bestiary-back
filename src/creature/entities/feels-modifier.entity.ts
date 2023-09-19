import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";
import {Feel} from "./feel.entity";

@Entity()
export class FeelModifiers {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Feel, (feel) => feel.feelModifiers)
    feel_name: Feel;

    @Column({nullable: true})
    feel_modifier: number;

    @Column({nullable: true})
    feel_measure_EN: string;

    @Column({nullable: true})
    feel_measure_UA: string;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}