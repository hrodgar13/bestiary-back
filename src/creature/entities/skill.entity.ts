import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SkillModifier} from "./skill-modifier.entity";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    skill_name: string

    @OneToMany(() => SkillModifier, (skillModifier) => skillModifier.skill_name_id)
    skill_modifier: SkillModifier[]
}