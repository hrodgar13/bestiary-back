import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Statement {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    statement_UA: string

    @Column({nullable: true})
    statement_EN: string

    @ManyToMany(() => Creature)
    creatures: Creature[]
}