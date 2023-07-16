import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";
import {SavingThrow} from "./saving-throw.entity";

@Entity()
export class SavingThrowModifier {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => SavingThrow, (savingThrow) => savingThrow.saving_throw_modifier)
    saving_throw_name: SavingThrow;

    @Column()
    modifier: number

    @ManyToMany(() => Creature)
    creatures: Creature[]
}