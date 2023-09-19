import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    language_name_EN: string

    @Column({nullable: true})
    language_name_UA: string

    @ManyToMany(() => Creature)
    creature: Creature[]
}