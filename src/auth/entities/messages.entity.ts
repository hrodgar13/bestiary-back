import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    isRead: boolean

    @Column()
    dateOfCreation: Date

    @Column()
    isAdminRequest: boolean

    @ManyToOne(() => User, (usr) => usr.messages)
    user: User
}