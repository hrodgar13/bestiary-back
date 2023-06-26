import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Ability {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title_UA: string

    @Column()
    title_EN: string

    @Column()
    ability_UA: string

    @Column()
    ability_EN: string

    @ManyToMany(() => Creature)
    creatures: Creature[]
}