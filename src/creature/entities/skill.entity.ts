import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SkillModifier} from "./skill-modifier.entity";
import {SavingThrowModifier} from "./saving-throw-modifier.entity";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    skill_name_EN: string

    @Column({nullable: true})
    skill_name_UA: string

    @OneToMany(() => SkillModifier, (skillMod) => skillMod.skill_name)
    skill_modifier: SavingThrowModifier[]
}