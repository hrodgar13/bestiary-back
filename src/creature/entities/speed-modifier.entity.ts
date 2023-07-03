import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Creature} from "./creature.entity";
import {Speed} from "./speed.entity";

@Entity()
export class SpeedModifier{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speed_amount: number

    @ManyToOne(() => Speed, (speed) => speed.speeds_modifier)
    speed_name_id: number;

    @ManyToMany(() => Creature)
    creatures: Creature[]
}