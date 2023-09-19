import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Ability {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title_UA: string

    @Column({nullable: true})
    title_EN: string

    @Column({nullable: true})
    ability_UA: string

    @Column({nullable: true})
    ability_EN: string

    @ManyToMany(() => Creature)
    creatures: Creature[]
}