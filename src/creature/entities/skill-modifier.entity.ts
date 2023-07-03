import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";
import {Skill} from "./skill.entity";

@Entity()
export class SkillModifier {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Skill, (skill) => skill.skill_modifier)
    skill_name_id: number;

    @Column()
    modifier: number;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}