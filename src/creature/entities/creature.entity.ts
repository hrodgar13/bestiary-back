import {Column,JoinColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Images} from "./images.entity";
import {Size} from "./size.entity";
import {Type} from "./type.entity";
import {Aligment} from "./aligment.entity";
import {IsNumber, Max, Min} from "class-validator";
import {ArmorClass} from "./armor-class.entity";
import {Speed} from "./speed.entity";
import {StatBlock} from "./stat-block.entity";
import {SavingThrow} from "./saving-throw.entity";
import {Skill} from "./skill.entity";
import {DamageType} from "./damage-type.entity";
import {Statement} from "./statement.entity";

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
    @IsNumber()
    @Min(0)
    @Max(50)
    armor_Class: number

    @ManyToOne(() => ArmorClass, (armorClass) => armorClass.creatures)
    armor_type_id: string

    @Column()
    hit_points: string

    @Column()
    hit_points_by_dices: string

    @ManyToMany(() => Speed, (speed) => {speed.creatures})
    @JoinTable({
        name: 'creature_To_speed',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'speed_id',
            referencedColumnName: 'id'
        }
    })
    creature_speeds: Speed[]

    @OneToOne(() => StatBlock)
    @JoinColumn()
    creature_stat_block: StatBlock

    @ManyToMany(() => SavingThrow)
    @JoinTable({
        name: 'creature_to_savingThrow',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'savingThrow_id',
            referencedColumnName: 'id'
        }
    })
    creature_saving_throws: SavingThrow[]

    @ManyToMany(() => Skill)
    @JoinTable({
        name: 'creature_to_skill',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'skill_id',
            referencedColumnName: 'id'
        }
    })
    creature_skills: Skill[]

    @ManyToMany(() => DamageType)
    @JoinTable({
        name: 'creature_to_vulnerability',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'damage_id',
            referencedColumnName: 'id'
        }
    })
    creature_vulnerability: DamageType[]

    @ManyToMany(() => DamageType)
    @JoinTable({
        name: 'creature_to_resistance',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'damage_id',
            referencedColumnName: 'id'
        }
    })
    creature_resistance: DamageType[]

    @ManyToMany(() => DamageType)
    @JoinTable({
        name: 'creature_to_immunity',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'damage_id',
            referencedColumnName: 'id'
        }
    })
    creature_immunity: DamageType[]

    @ManyToMany(() => Statement)
    @JoinTable({
        name: 'creature_to_statementImmunity',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'statement_id',
            referencedColumnName: 'id'
        }
    })
    creature_statement_immunity: Statement[]

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