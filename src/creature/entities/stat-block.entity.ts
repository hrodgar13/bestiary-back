import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNumber, Max, Min} from "class-validator";

@Entity()
export class StatBlock {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    strength: number

    @Column()
    dexterity: number

    @Column()
    construction: number

    @Column()
    intelligence: number

    @Column()
    wisdom: number

    @Column()
    charisma: number
}