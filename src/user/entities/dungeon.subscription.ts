import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Request} from "../../auth/entities/messages.entity";
import {ActionsAbilities} from "../../creature/entities/actions-abilities.entity";
import {UserProfile} from "./user-profile.entity";

@Entity()
export class DungeonSubscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string

    @Column()
    dateOfExpire: Date

    @Column()
    subPhotoUrl: string

    @OneToMany(() => UserProfile, (up) => up.subscription )
    users: UserProfile[]
}
