import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class SavingThrow {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    saving_throw: string

    @Column()
    modifier: number

    @ManyToMany(() => Creature)
    creatures: Creature[]
}