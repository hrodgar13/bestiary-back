import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SavingThrowModifier} from "./saving-throw-modifier.entity";

@Entity()
export class SavingThrow {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    saving_throw_name: string

    @OneToMany(() => SavingThrowModifier, (savingThrowModifier) => savingThrowModifier.saving_throw_name_id)
    saving_throw_modifier: SavingThrowModifier[]
}