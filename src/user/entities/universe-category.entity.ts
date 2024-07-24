import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Universe} from "./universe.entity";
import {UniverseCategoryItem} from "./universe-category-item.entity";

@Entity()
export class UniverseCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @OneToMany(() => UniverseCategoryItem, (uci) => uci.category)
    items: UniverseCategoryItem[]

    @ManyToOne(() => Universe, (u) => u.categories)
    universe: Universe
}
