import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SpeedModifier} from "./speed-modifier.entity";

@Entity()
export class Speed {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speed_type_name: string

    @OneToMany(() => SpeedModifier, (speedModifier) => speedModifier.speed_name)
    speeds_modifier: SpeedModifier[]
}