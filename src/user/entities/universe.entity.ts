import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UniverseHat} from "./universe-hat.entity";
import {UniverseCategory} from "./universe-category.entity";
import {UserProfile} from "./user-profile.entity";
import {UniverseTag} from "./tags.entity";

@Entity()
export class Universe {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UniverseHat, {onDelete: 'CASCADE', cascade: true})
    @JoinColumn()
    hat: UniverseHat

    @ManyToMany(() => UniverseTag)
    filterCategories: UniverseTag[]

    @OneToMany(() => UniverseCategory, (uc) => uc.universe, { cascade: true } )
    categories: UniverseCategory[]

    @ManyToOne(() => UserProfile, (up) => up.universes)
    userProfile: UserProfile
}
