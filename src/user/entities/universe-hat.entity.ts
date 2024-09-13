import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IMAGE_POSITIONS} from "../static/enums";
import {UniverseStructureParagraph} from "./universe-stucture-paragraph.entity";
import {Universe} from "./universe.entity";

@Entity()
export class UniverseHat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    universeName: string

    @OneToMany(() => UniverseStructureParagraph, (usp) => usp.hat, {cascade: true})
    description: UniverseStructureParagraph[]

    @Column('text', { array: true })
    images: string[];

    @Column({
        type: "enum",
        enum: IMAGE_POSITIONS
    })
    imagePosition: IMAGE_POSITIONS
}
