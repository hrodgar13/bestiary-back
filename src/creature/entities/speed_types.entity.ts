import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Speed} from "./speed.entity";

@Entity()
export class SpeedTypes {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speed_type: string

    @ManyToMany(() => Speed, (speed) => speed.speed_type)
    speed: Speed[]
}