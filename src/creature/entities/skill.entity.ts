import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SkillModifier} from "./skill-modifier.entity";
import {SavingThrowModifier} from "./saving-throw-modifier.entity";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    skill_name: string

    @OneToMany(() => SkillModifier, (skillMod) => skillMod.skill_name_id)
    skill_modifier: SavingThrowModifier[]
}