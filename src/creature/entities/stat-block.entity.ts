import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class StatBlock {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    strength: number

    @Column({nullable: true})
    dexterity: number

    @Column({nullable: true})
    constitution: number

    @Column({nullable: true})
    intelligence: number

    @Column({nullable: true})
    wisdom: number

    @Column({nullable: true})
    charisma: number
}