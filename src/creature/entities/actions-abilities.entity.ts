import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Translation} from "./translation.entity";
import {Creature} from "./creature.entity";

@Entity()
export class ActionsAbilities {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    action_type: string

    @OneToOne(() => Translation, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    title: Translation

    @OneToOne(() => Translation, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    description: Translation

    @ManyToOne(() => Creature, (creature) => creature.action_abilities)
    creature: Creature
}