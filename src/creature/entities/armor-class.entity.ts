import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class ArmorClass {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    armorType: string

    @OneToMany(() => Creature, (creature) => creature.armor_type_id)
    creatures: string
}