import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Translation} from "./translation.entity";
import {Measure} from "./measure.entity";
import {Creature} from "./creature.entity";

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    attr_cat: string

    @Column({nullable: true})
    scaling_from: string | null

    @OneToOne(() => Translation)
    @JoinColumn()
    name: Translation

    @OneToMany(() => Measure, (msr) => msr.attribute)
    measures: Measure[]

    @ManyToMany(() => Creature)
    creatures: Creature[];
}
