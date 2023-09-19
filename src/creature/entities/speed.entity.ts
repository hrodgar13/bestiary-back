import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SpeedModifier} from "./speed-modifier.entity";

@Entity()
export class Speed {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    speed_type_name_EN: string

    @Column({nullable: true})
    speed_type_name_UA: string

    @OneToMany(() => SpeedModifier, (speedModifier) => speedModifier.speed_name)
    speeds_modifier: SpeedModifier[]
}