import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    size_UA: string;

    @Column({nullable: true})
    size_EN: string;

    @OneToMany(() => Creature, (creature) => creature.creature_size)
    creatures: Creature[]
}