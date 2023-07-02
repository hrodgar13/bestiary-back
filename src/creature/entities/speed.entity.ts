import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNumber, Min} from "class-validator";
import {Creature} from "./creature.entity";
import {SpeedTypes} from "./speed_types.entity";

@Entity()
export class Speed{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNumber()
    @Min(0)
    speed: number

    @OneToMany(() => SpeedTypes, (speed_types) => speed_types.speed_type)
    speed_type: string

    @ManyToMany(() => Creature, (creature) => creature.creature_speeds)
    creatures: Creature[]
}