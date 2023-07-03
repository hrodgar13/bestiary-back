import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SkillModifier} from "./skill-modifier.entity";
import {FeelModifiers} from "./feels-modifier.entity";

@Entity()
export class Feel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    feel_name: string

    @OneToMany(() => FeelModifiers, (feelMod) => feelMod.feel_name_id)
    feelModifiers: FeelModifiers[]
}