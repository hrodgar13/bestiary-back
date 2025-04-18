import {Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Translation} from "../../creature/entities/translation.entity";
import {Attribute} from "../../creature/entities/attribute.entity";
import {Universe} from "./universe.entity";


@Entity()
export class UniverseTag {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Translation)
    @JoinColumn()
    tagName: Translation

    @ManyToMany(() => Universe, (universe) => universe.filterCategories)
    @JoinTable({
        name: 'tag_to_universe',
        joinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'universe_id',
            referencedColumnName: 'id'
        }
    })
    universes: Universe[]
}
