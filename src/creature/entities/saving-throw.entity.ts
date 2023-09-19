import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SavingThrowModifier} from "./saving-throw-modifier.entity";

@Entity()
export class SavingThrow {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    saving_throw_name_EN: string

    @Column({nullable: true})
    saving_throw_name_UA: string

    @OneToMany(() => SavingThrowModifier, (savingThrowModifier) => savingThrowModifier.saving_throw_name)
    saving_throw_modifier: SavingThrowModifier[]
}