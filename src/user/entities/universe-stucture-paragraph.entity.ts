import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UniverseHat} from "./universe-hat.entity";
import {STRUCTURE_PARAGRAPH_TYPES} from "../static/enums";
import {UniverseCategoryItem} from "./universe-category-item.entity";

@Entity()
export class UniverseStructureParagraph {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order: number

    @Column()
    title: string

    @Column({
        type: "enum",
        enum: STRUCTURE_PARAGRAPH_TYPES
    })

    @ManyToOne(() => UniverseHat, (uh) => uh.description)
    hat: UniverseHat

    @ManyToOne(() => UniverseCategoryItem, (uci) => uci.information)
    categoryItem: UniverseCategoryItem

    @Column({type: 'jsonb'})
    metadata: Record<string, any>
}
