import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Attribute} from "./attribute.entity";
import {Creature} from "./creature.entity";

@Entity()
export class Measure {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    amt: number | null

    @Column({nullable: true})
    isMeasureEnable: boolean | null

    @ManyToOne(() => Attribute, (attr) => attr.measures)
    attribute: Attribute

    @ManyToOne(() => Creature, (creature) => creature.measures)
    creature: Creature
}