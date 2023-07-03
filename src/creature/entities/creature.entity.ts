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
    armor_Class: number

    @ManyToOne(() => ArmorClass, (armorClass) => armorClass.creatures)
    armor_type_id: number

    @Column()
    hit_points: number

    @Column()
    hit_points_by_dices: string

    @ManyToMany(() => SpeedModifier)
    @JoinTable({
        name: 'creature_to_speed',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'speed_id',
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
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'savingThrow_id',
            referencedColumnName: 'id'
        }
    })
    creature_saving_throws: SavingThrowModifier[]

    @ManyToMany(() => SkillModifier)
    @JoinTable({
        name: 'creature_to_skill',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'skill_modifier_id',
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
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'resist_damage_id',
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
            name: 'immune_damage_id',
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

    @ManyToMany(() => FeelModifiers)
    @JoinTable({
        name: 'creature_to_feel',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'feel_id',
            referencedColumnName: 'id'
        }
    })
    creature_feels : FeelModifiers[]

    @ManyToMany(() => Language)
    @JoinTable({
        name: 'creature_to_language',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'language_id',
            referencedColumnName: 'id'
        }
    })
    creature_languages : Language[]

    @Column()
    creature_danger_level : number

    @Column()
    creature_exp_amount : number

    @Column()
    creature_mastery_bonus: number


    @ManyToMany(() => Ability)
    @JoinTable({
        name: 'creature_to_abilities',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'ability_id',
            referencedColumnName: 'id'
        }
    })
    creature_abilities : Ability[]

    @ManyToMany(() => Action)
    @JoinTable({
        name: 'creature_to_actions',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'action_id',
            referencedColumnName: 'id'
        }
    })
    creature_actions : Action[]

    @ManyToMany(() => Action)
    @JoinTable({
        name: 'creature_to_bonus',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'action_id',
            referencedColumnName: 'id'
        }
    })
    creature_bonus_action : Action[]

    @ManyToMany(() => Action)
    @JoinTable({
        name: 'creature_to_legendary',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'action_id',
            referencedColumnName: 'id'
        }
    })
    creature_legendary_action : Action[]

    @Column()
    creature_description : string
}