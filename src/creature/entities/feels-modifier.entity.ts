import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";
import {ArmorClass} from "./armor-class.entity";

@Entity()
export class FeelModifiers {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ArmorClass, (armorClass) => armorClass.creatures)
    feel_name_id: string;

    @Column()
    feel_modifier: number;

    @Column()
    feel_measure: string;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}