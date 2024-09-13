import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UniverseHat} from "./universe-hat.entity";
import {UniverseCategory} from "./universe-category.entity";
import {UserProfile} from "./user-profile.entity";

@Entity()
export class Universe {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UniverseHat, {onDelete: 'CASCADE', cascade: true})
    @JoinColumn()
    hat: UniverseHat

    @Column('text', { array: true })
    filterCategories: string[]

    @OneToMany(() => UniverseCategory, (uc) => uc.universe, { cascade: true } )
    categories: UniverseCategory[]

    @ManyToOne(() => UserProfile, (up) => up.universes)
    userProfile: UserProfile
}
