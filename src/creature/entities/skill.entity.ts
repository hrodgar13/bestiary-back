import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    skill: string;

    @Column()
    modifier: number;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}