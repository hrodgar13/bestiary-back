import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Images} from "./images.entity";
import {Size} from "./size.entity";
import {Type} from "./type.entity";
import {Aligment} from "./aligment.entity";

@Entity()
export class Creature {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    creature_name: string

    @Column()
    creature_name_tag: string

    @OneToMany(() => Images, (images) => images.creature_id)
    creature_images: Images[]

    @ManyToOne(() => Size, (size) => size.creatures)
    creature_size_id: number

    @ManyToOne(() => Type, (type) => type.creatures)
    creature_type_id: number

    @ManyToOne(() => Aligment, (aligment) => aligment.creatures)
    creature_aligment_id: number

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