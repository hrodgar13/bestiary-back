import {Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import {Translation} from "./translation.entity";
import {Measure} from "./measure.entity";
import {Attribute} from "./attribute.entity";
import {ActionsAbilities} from "./actions-abilities.entity";
import {StatBlock} from "./stat-block.entity";

@Entity()
export class Creature {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    isFinished: boolean

    @OneToOne(() => Translation)
    @JoinColumn()
    name: Translation

    @Column({nullable: true})
    image: string | null

    @Column({nullable: true})
    armor_class: number

    @Column({nullable: true})
    hits: string

    @Column({nullable: true})
    hits_in_dice: string

    @Column({nullable: true})
    danger_lvl: number

    @Column({nullable: true})
    experience: string

    @Column({nullable: true})
    mastery_bonus: number

    @OneToOne(() => StatBlock)
    @JoinColumn()
    stat_block: StatBlock

    @OneToMany(() => Measure, (msr) => msr.creature)
    measures: Measure[]

    @ManyToMany(() => Attribute)
    @JoinTable({
        name: 'creature_to_attributes',
        joinColumn: {
            name: 'creature_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'attribute_id',
            referencedColumnName: 'id'
        }
    })
    attributes: Attribute[]

    @OneToMany(() => ActionsAbilities, (acab) => acab.creature)
    action_abilities: ActionsAbilities[]

    @OneToOne(() => Translation)
    @JoinColumn()
    description: Translation
}