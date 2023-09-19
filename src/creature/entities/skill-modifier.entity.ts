import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";
import {Skill} from "./skill.entity";

@Entity()
export class SkillModifier {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Skill, (skill) => skill.skill_modifier)
    skill_name: Skill;

    @Column({nullable: true})
    modifier: number;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}