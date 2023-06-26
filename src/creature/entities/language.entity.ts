import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    language_name: string

    @ManyToMany(() => Creature)
    creature: Creature[]
}