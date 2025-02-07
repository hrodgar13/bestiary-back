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
    type: STRUCTURE_PARAGRAPH_TYPES

    @ManyToOne(() => UniverseHat, (uh) => uh.description, { nullable: true, onDelete: 'CASCADE' })
    hat: UniverseHat

    @ManyToOne(() => UniverseCategoryItem, (uci) => uci.information, { nullable: true, onDelete: 'CASCADE' })
    categoryItem: UniverseCategoryItem

    @Column({type: 'jsonb'})
    metadata: Record<string, any>
}
