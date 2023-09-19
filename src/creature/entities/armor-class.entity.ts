import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";

@Entity()
export class ArmorClass {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    armorType_UA: string

    @Column({nullable: true})
    armorType_EN: string

    @OneToMany(() => Creature, (creature) => creature.armor_type)
    creatures: Creature[]
}