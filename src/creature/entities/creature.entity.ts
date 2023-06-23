import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Images} from "./images.entity";

@Entity()
export class Creature {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    creature_name: string

    @Column()
    creature_name_tag: string

    @OneToMany(() => Images, (images) => images.creature_id)
    images: Images[]

    @Column()
    creature_size: number

    @Column()
    creature_type: number

    @Column()
    creature_aligment: number

    @Column()
    creature_armor_class: number

    @Column()
    creature_hit_points: number

    @Column()
    creature_speeds: number

    @Column()
    creature_stat_block: number

    @Column()
    creature_saving_throws: number

    @Column()
    creature_skills: number

    @Column()
    creature_vulnerability: number

    @Column()
    creature_resistance: number

    @Column()
    creature_immunity: number

    @Column()
    creature_statement_immunity: number

    @Column()
    creature_feels : number

    @Column()
    creature_languages : number

    @Column()
    creature_danger_level : number

    @Column()
    creature_mastery_bonus: number

    @Column()
    creature_abilities : number

    @Column()
    creature_bonus_action : number

    @Column()
    creature_legendary_action : number

    @Column()
    creature_description : number
}