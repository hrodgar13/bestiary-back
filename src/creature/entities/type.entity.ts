import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Type{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @OneToMany(() => Creature, (creature) => creature.creature_type_id)
    creatures: Creature[]
}