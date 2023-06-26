import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class DamageType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    damage_name: string;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}