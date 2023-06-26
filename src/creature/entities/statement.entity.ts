import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Statement {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    statement: string

    @ManyToMany(() => Creature)
    creatures: Creature[]
}