import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {DungeonSubscription} from "./dungeon.subscription";
import {User} from "../../auth/entities/user.entity";
import {Universe} from "./universe.entity";

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    avatarUrl: string | null

    @Column({nullable: true})
    name: string | null

    @Column({default: new Date()})
    dateOfCreation: Date

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @ManyToOne(() => DungeonSubscription, (ds) => ds.users)
    subscription: DungeonSubscription

    @OneToMany(() => Universe, (u) => u.userProfile )
    universes: Universe[]
}
