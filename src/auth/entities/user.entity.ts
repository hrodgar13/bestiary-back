import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Request} from "./messages.entity";
import {UserProfile} from "../../user/entities/user-profile.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Request, (msg) => msg.user)
    messages: Request[]
}
