import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Request} from "./messages.entity";

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