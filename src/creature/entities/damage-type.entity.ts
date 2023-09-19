import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class DamageType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    damage_name_UA: string;

    @Column({nullable: true})
    damage_name_EN: string;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}