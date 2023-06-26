import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNumber, Min} from "class-validator";
import {Creature} from "./creature.entity";

@Entity()
export class Speed{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNumber()
    @Min(0)
    speed: number

    @Column()
    speed_type: string

    @ManyToMany(() => Creature, (creature) => creature.creature_speeds)
    creatures: Creature[]
}