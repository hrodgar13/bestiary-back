import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class Action {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title_EN: string;

    @Column()
    title_UA: string;

    @Column()
    action_EN: string;

    @Column()
    action_UA: string;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}