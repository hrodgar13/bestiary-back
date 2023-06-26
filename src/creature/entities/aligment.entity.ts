import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Aligment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    aligment: string;

    @OneToMany(() => Creature, (creature) => creature.creature_aligment_id)
    creatures: Creature[]
}