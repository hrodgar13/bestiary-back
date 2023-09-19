import {Column,JoinColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Images} from "./images.entity";
import {Size} from "./size.entity";
import {Type} from "./type.entity";
import {Aligment} from "./aligment.entity";
import {ArmorClass} from "./armor-class.entity";
import {SpeedModifier} from "./speed-modifier.entity";
import {StatBlock} from "./stat-block.entity";
import {SavingThrowModifier} from "./saving-throw-modifier.entity";
import {SkillModifier} from "./skill-modifier.entity";
import {DamageType} from "./damage-type.entity";
import {Statement} from "./statement.entity";
import {FeelModifiers} from "./feels-modifier.entity";
import {Language} from "./language.entity";
import {Action} from "./action.entity";
import {Ability} from "./abilities.entity";

@Entity()
export class Creature {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    isFinished: boolean

    @Column({
        nullable: true
    })
    creature_name_EN: string

    @Column({
        nullable: true
    })
    creature_name_UA: string

    @Column({
        nullable: true
    })
    creature_name_tag: string

    @OneToMany(() => Images, (images) => images.creature)
    creature_images: Images[]

    @ManyToOne(() => Size, (size) => size.creatures)
    creature_size: Size

    @ManyToOne(() => Type, (type) => type.creatures)
    creature_type: Type

    @ManyToOne(() => Aligment, (alignment) => alignment.creatures)
    creature_alignment: Aligment


    @Column({
        nullable: true
    })
    armor_Class: number

    @ManyToOne(() => ArmorClass, (armorClass) => armorClass.creatures)
    armor_type: ArmorClass

    @Column({
        nullable: true
    })
    hit_points: number

    @Column({
        nullable: true
    })
    hit_points_by_dices: string

    @ManyToMany(() => SpeedModifier)
    @JoinTable({
        name: 'creature_to_speed',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'speed_modifier',
            referencedColumnName: 'id'
        }
    })
    creature_speeds: SpeedModifier[]



    @OneToOne(() => StatBlock)
    @JoinColumn()
    creature_stat_block: StatBlock

    @ManyToMany(() => SavingThrowModifier)
    @JoinTable({
        name: 'creature_to_savingThrow',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'saving_throw_modifier',
            referencedColumnName: 'id'
        }
    })
    creature_saving_throws: SavingThrowModifier[]

    @ManyToMany(() => SkillModifier)
    @JoinTable({
        name: 'creature_to_skill',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'skill_modifier',
            referencedColumnName: 'id'
        }
    })
    creature_skills: SkillModifier[]

    @ManyToMany(() => DamageType)
    @JoinTable({
        name: 'creature_to_vulnerability',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'vulnerability_damage_id',
            referencedColumnName: 'id'
        }
    })
    creature_vulnerability: DamageType[]

    @ManyToMany(() => DamageType)
    @JoinTable({
        name: 'creature_to_resistance',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'resist_damage',
            referencedColumnName: 'id'
        }
    })
    creature_resistance: DamageType[]

    @ManyToMany(() => DamageType)
    @JoinTable({
        name: 'creature_to_immunity',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'immune_damage',
            referencedColumnName: 'id'
        }
    })
    creature_immunity: DamageType[]

    @ManyToMany(() => Statement)
    @JoinTable({
        name: 'creature_to_statement_immunity',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'statement',
            referencedColumnName: 'id'
        }
    })
    creature_statement_immunity: Statement[]

    @ManyToMany(() => FeelModifiers)
    @JoinTable({
        name: 'creature_to_feel',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'feel_modifier',
            referencedColumnName: 'id'
        }
    })
    creature_feels : FeelModifiers[]

    @ManyToMany(() => Language)
    @JoinTable({
        name: 'creature_to_language',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'language',
            referencedColumnName: 'id'
        }
    })
    creature_languages : Language[]

    @Column({
        nullable: true
    })
    creature_danger_level : number

    @Column({
        nullable: true
    })
    creature_exp_amount : number

    @Column({
        nullable: true
    })
    creature_mastery_bonus: number


    @ManyToMany(() => Ability)
    @JoinTable({
        name: 'creature_to_abilities',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'ability',
            referencedColumnName: 'id'
        }
    })
    creature_abilities : Ability[]

    @ManyToMany(() => Action)
    @JoinTable({
        name: 'creature_to_actions',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'action',
            referencedColumnName: 'id'
        }
    })
    creature_actions : Action[]

    @ManyToMany(() => Action)
    @JoinTable({
        name: 'creature_to_bonus',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'action',
            referencedColumnName: 'id'
        }
    })
    creature_bonus_action : Action[]

    @ManyToMany(() => Action)
    @JoinTable({
        name: 'creature_to_legendary',
        joinColumn: {
            name: 'creature',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'action',
            referencedColumnName: 'id'
        }
    })
    creature_legendary_action : Action[]

    @Column({
        nullable: true
    })
    creature_description_EN : string

    @Column({
        nullable: true
    })
    creature_description_UA : string
}