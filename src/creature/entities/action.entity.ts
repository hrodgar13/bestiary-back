import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Action {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title_EN: string;

    @Column({nullable: true})
    title_UA: string;

    @Column({nullable: true})
    action_EN: string;

    @Column({nullable: true})
    action_UA: string;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}