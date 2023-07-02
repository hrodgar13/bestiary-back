import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Speed} from "./speed.entity";

@Entity()
export class SpeedTypes {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speed_type: string

    @ManyToOne(() => Speed, (speed) => speed.speed_type)
    speed: Speed[]
}