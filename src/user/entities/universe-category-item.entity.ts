import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UniverseCategory} from "./universe-category.entity";
import {UniverseStructureParagraph} from "./universe-stucture-paragraph.entity";

@Entity()
export class UniverseCategoryItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @OneToMany(() => UniverseStructureParagraph, (usp) => usp.categoryItem, { cascade: true })
    information: UniverseStructureParagraph[]

    @ManyToOne(() => UniverseCategory, (uc) => uc.items, { onDelete: 'CASCADE' })
    category: UniverseCategory
}
