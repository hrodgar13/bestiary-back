import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FeelModifiers} from "./feels-modifier.entity";

@Entity()
export class Feel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    feel_name_EN: string

    @Column({nullable: true})
    feel_name_UA: string

    @OneToMany(() => FeelModifiers, (feelMod) => feelMod.feel_name)
    feelModifiers: FeelModifiers[]
}