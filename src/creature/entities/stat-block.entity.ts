import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNumber, Max, Min} from "class-validator";

@Entity()
export class StatBlock {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNumber()
    @Min(1)
    @Max(30)
    strength: number

    @Column()
    @IsNumber()
    @Min(1)
    @Max(30)
    dexterity: number

    @Column()
    @IsNumber()
    @Min(1)
    @Max(30)
    construction: number

    @Column()
    @IsNumber()
    @Min(1)
    @Max(30)
    intelligence: number

    @Column()
    @IsNumber()
    @Min(1)
    @Max(30)
    wisdom: number

    @Column()
    @IsNumber()
    @Min(1)
    @Max(30)
    charisma: number
}